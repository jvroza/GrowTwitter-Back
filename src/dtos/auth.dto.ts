import { AuthUserDto } from "./auth-user.dto";

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginOutputDto {
  authToken: string;
  authUser: AuthUserDto;
}
