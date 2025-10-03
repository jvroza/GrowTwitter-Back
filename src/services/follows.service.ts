import { User as UserEntity } from "@prisma/client";

import prismaRepository from "../database/prisma.repository";
import { FollowDto } from "../dtos";
import { User } from "../models";
import { HTTPError } from "../utils";

export class FollowService {
  constructor() {}

  public async follow(dto: FollowDto): Promise<void> {
    // Um usuário não pode seguir ele mesmo
    if (dto.followerId === dto.followingId) {
      throw new HTTPError(400, "You cannot follow yourself");
    }

    // Um usuário não pode seguir o mesmo usuário mais de uma vez
    const existingFollow = await prismaRepository.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: dto.followerId,
          followingId: dto.followingId,
        },
      },
    });

    if (existingFollow) {
      throw new HTTPError(409, "You are already following this user");
    }

    await prismaRepository.follow.create({
      data: {
        followerId: dto.followerId,
        followingId: dto.followingId,
      },
    });
  }

  public async unfollow(dto: FollowDto): Promise<void> {
    // Um usuário não pode deixar de seguir ele mesmo
    if (dto.followerId === dto.followingId) {
      throw new HTTPError(400, "Follower and following IDs cannot be the same");
    }

    // Verifica se o follow existe antes de tentar remover
    const existingFollow = await prismaRepository.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: dto.followerId,
          followingId: dto.followingId,
        },
      },
    });

    if (!existingFollow) {
      throw new HTTPError(404, "You are not following this user");
    }

    await prismaRepository.follow.delete({
      where: {
        followerId_followingId: {
          followerId: dto.followerId,
          followingId: dto.followingId,
        },
      },
    });
  }

  public async listFollowings(
    userId: string,
  ): Promise<{ followings: User[]; followers: User[] }> {
    const followings = await this.listFollowingsByUserId(userId);
    const followers = await this.listFollowersByUserId(userId);
    return {
      followings: followings,
      followers: followers,
    };
  }

  private async listFollowersByUserId(userId: string): Promise<User[]> {
    // Busca na tabela de follows os usuários que seguem o userId
    const followersDB = await prismaRepository.follow.findMany({
      where: { followingId: userId },
      orderBy: { createdAt: "desc" },
      include: { follower: true },
    });

    return followersDB.map((user) => this.mapToModel(user.follower));
  }

  private async listFollowingsByUserId(userId: string): Promise<User[]> {
    // Busca na tabela de follows os usuários que seguem o userId
    const followingsDB = await prismaRepository.follow.findMany({
      where: { followerId: userId },
      orderBy: { createdAt: "desc" },
      include: { following: true },
    });

    return followingsDB.map((user) => this.mapToModel(user.following));
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
