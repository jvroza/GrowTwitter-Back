import { User as UserEntity } from "@prisma/client";

import prismaRepository from "../database/prisma.repository";
import { CreateUserDto } from "../dtos/user.dto";
import { User } from "../models";
import { HTTPError } from "../utils";

export class UserService {
  public async findByUsername(username: string): Promise<User | null> {
    const user = await prismaRepository.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return null;

    return this.mapToModel(user).withPassword(user.password);
  }

  public async create(dto: CreateUserDto): Promise<User> {
    const newUser = await prismaRepository.user.create({
      data: {
        name: dto.name,
        imageUrl: dto.imageUrl,
        username: dto.username,
        password: dto.password,
      },
    });

    return this.mapToModel(newUser);
  }

  public async getById(userId: string): Promise<User> {
    const user = await prismaRepository.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HTTPError(404, "User not found");
    }

    return this.mapToModel(user);
  }

  public async listAll(): Promise<User[]> {
    const users = await prismaRepository.user.findMany();

    return users.map((user) => this.mapToModel(user));
  }

  private mapToModel(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.imageUrl,
      entity.username,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
