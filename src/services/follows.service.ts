import { Follow as FollowEntity } from "@prisma/client";

import prismaRepository from "../database/prisma.repository";
import { FollowDto } from "../dtos";
import { HTTPError } from "../utils";

export class FollowService {
  constructor() {}

  public async follow(dto: FollowDto): Promise<void> {
    if (dto.followerId === dto.followingId) {
      throw new HTTPError(400, "You cannot follow yourself");
    }

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
    if (dto.followerId === dto.followingId) {
      throw new HTTPError(400, "Follower and following IDs cannot be the same");
    }

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
        id: existingFollow.id,
      },
    });
  }

  public async listFollowersByUserId(userId: string): Promise<any[]> {
    const tweetsDB = await prismaRepository.tweet.findMany({
      where: { type: TweetType.NORMAL, authorId: userId },
      orderBy: { createdAt: "desc" },
    });

    const tweets: Tweet[] = [];

    for (const tweet of tweetsDB) {
      const replies = await this.listRepliesByTweetId(tweet.id);
      const likes = await this.likeService.listLikesByTweetId(tweet.id);

      const tweetModel = this.mapToModel(tweet);
      tweetModel.withLikes(likes);
      tweetModel.withReplies(replies);
      tweets.push(tweetModel);
    }

    return tweets;
  }

  private async listFollowingsByUserId(userId: string): Promise<any[]> {
    const repliesDB = await prismaRepository.reply.findMany({
      where: { tweetId },
      include: { reply: { include: { author: true } } },
    });

    const replies: Tweet[] = [];

    for (const r of repliesDB) {
      const author = new User(
        r.reply.author.id,
        r.reply.author.name,
        r.reply.author.imageUrl,
        r.reply.author.username,
        r.reply.author.createdAt,
        r.reply.author.updatedAt,
      );

      const likes = await this.likeService.listLikesByTweetId(r.reply.id);

      const reply = new Tweet(
        r.reply.id,
        r.reply.content,
        r.reply.type,
        r.reply.createdAt,
        r.reply.updatedAt,
      );

      reply.withAuthor(author);
      reply.withLikes(likes);
      replies.push(reply);
    }

    return replies;
  }

  private mapToModel(entity: FollowEntity): Tweet {
    return new Tweet(
      entity.id,
      entity.content,
      entity.type,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
