import { Like, User } from ".";

type TweetType = "NORMAL" | "REPLY";

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

  public toJSON() {
    return {
      id: this.id,
      content: this.content,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      author: this.author,
      replies: this.replies,
      likes: this.likes,
    };
  }
}
