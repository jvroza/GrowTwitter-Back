import { LoginDto, LoginOutputDto } from "../dtos/auth.dto";
import { CreateUserDto } from "../dtos/user.dto";
import { User } from "../models";
import { HTTPError } from "../utils";
import { UserService } from "./user.service";
import { BcryptAdapter, JWTAdapter } from "../adapters";
import { AuthUserDto } from "../dtos";

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  public async register(dto: CreateUserDto): Promise<User> {
    const usernameAlreadyExists = await this.userService.findByUsername(
      dto.username,
    );

    if (usernameAlreadyExists) {
      throw new HTTPError(409, "Username already exists");
    }

    const passwordHashed = await this.bcryptAdapter.generateHash(dto.password);

    const newUser = await this.userService.create({
      ...dto,
      password: passwordHashed,
    });

    return newUser;
  }

  public async login(dto: LoginDto): Promise<LoginOutputDto> {
    const user = await this.userService.findByUsername(dto.username);

    if (!user) {
      throw new HTTPError(404, "User not found");
    }

    const userJson = user.toJSON();

    const isPasswordMatch = await this.bcryptAdapter.compareHash(
      dto.password,
      userJson.password!,
    );

    if (!isPasswordMatch) {
      throw new HTTPError(401, "Invalid credentials");
    }

    const authUser: AuthUserDto = {
      id: userJson.id,
      name: userJson.name,
      username: userJson.username,
    };
    const jwt = new JWTAdapter();
    const token = jwt.generateToken(authUser);

    return {
      authToken: token,
      authUser,
    };
  }
}
