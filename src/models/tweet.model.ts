import { Like, LikeDto, User, UserDto } from ".";

type TweetType = "NORMAL" | "REPLY";

export interface TweetDto {
  id: string;
  content: string;
  type: TweetType;
  createdAt: Date;
  updatedAt: Date;
  author?: UserDto;
  replies?: TweetDto[];
  likes?: LikeDto[];
}

export class Tweet {
  constructor(
    private id: string,
    private content: string,
    private type: TweetType,
    private createdAt: Date,
    private updatedAt: Date,
    private author?: User,
    private replies?: Tweet[],
    private likes?: Like[],
  ) {}

  public withReplies(replies: Tweet[]) {
    this.replies = replies;
    return this;
  }

  public withLikes(likes: Like[]) {
    this.likes = likes;
    return this;
  }

  public withAuthor(author: User) {
    this.author = author;
    return this;
  }

  public toJSON(): TweetDto {
    return {
      id: this.id,
      content: this.content,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      author: this.author?.toJSON(),
      replies: this.replies?.map((r) => r.toJSON()),
      likes: this.likes?.map((l) => l.toJSON()),
    };
  }
}
