import { User as UserEntity, Like as LikeEntity } from "@prisma/client";

import prismaRepository from "../database/prisma.repository";
import { CreateLikeDto } from "../dtos";
import { Like, User } from "../models";
import { HTTPError } from "../utils";

export class LikeService {
  public async listLikesByTweetId(tweetId: string): Promise<Like[]> {
    const likes = await prismaRepository.like.findMany({
      where: { tweetId },
      include: { author: true },
    });

    return likes.map((l) => this.mapToModel(l));
  }

  public async createLike(dto: CreateLikeDto): Promise<void> {
    const tweet = await prismaRepository.tweet.findUnique({
      where: { id: dto.tweetId },
    });

    if (!tweet) {
      throw new HTTPError(404, "Tweet not found.");
    }

    const likeAlreadyExists = await prismaRepository.like.findUnique({
      where: {
        tweetId_authorId: {
          tweetId: dto.tweetId,
          authorId: dto.authorId,
        },
      },
    });

    if (likeAlreadyExists) {
      throw new HTTPError(409, "Tweet already likes for you.");
    }

    await prismaRepository.like.create({
      data: { authorId: dto.authorId, tweetId: dto.tweetId },
      include: { author: true },
    });
  }

  public async removeLike(dto: CreateLikeDto): Promise<void> {
    const tweet = await prismaRepository.tweet.findUnique({
      where: { id: dto.tweetId },
    });

    if (!tweet) {
      throw new HTTPError(404, "Tweet not found.");
    }

    const likeFound = await prismaRepository.like.findUnique({
      where: {
        tweetId_authorId: {
          tweetId: dto.tweetId,
          authorId: dto.authorId,
        },
      },
    });

    if (!likeFound) {
      throw new HTTPError(404, "Tweet not likes for you.");
    }

    await prismaRepository.like.delete({
      where: {
        tweetId_authorId: {
          authorId: dto.authorId,
          tweetId: dto.tweetId,
        },
      },
    });
  }

  private mapToModel(entity: LikeEntity & { author: UserEntity }): Like {
    return new Like(
      new User(
        entity.author.id,
        entity.author.name,
        entity.author.imageUrl,
        entity.author.username,
        entity.author.createdAt,
        entity.author.updatedAt,
      ),
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
