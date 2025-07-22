import { User as UserEntity, Like as LikeEntity } from "@prisma/client";

import prismaRepository from "../database/prisma.repository";
import { Like, User } from "../models";

export class LikeService {
  public async listLikesByTweetId(tweetId: string): Promise<Like[]> {
    const likes = await prismaRepository.like.findMany({
      where: { tweetId },
      include: { author: true },
    });

    return likes.map((l) => this.mapToModel(l));
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
