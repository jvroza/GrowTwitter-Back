import { Tweet } from ".";

export class User {
  constructor(
    private id: string,
    private name: string,
    private imageUrl: string | null,
    private username: string,
    private createdAt: Date,
    private updatedAt: Date,
    private password?: string,
    private tweets?: Tweet[],
    private followers?: User[],
    private following?: User[],
  ) {}

  public withTweets(tweets: Tweet[]) {
    this.tweets = tweets;
    return this;
  }

  public withFollowers(followers: User[]) {
    this.followers = followers;
    return this;
  }

  public withFollowing(following: User[]) {
    this.following = following;
    return this;
  }

  public withPassword(password: string) {
    this.password = password;
    return this;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      imageUrl: this.imageUrl,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      password: this.password,
      tweets: this.tweets,
      followers: this.followers,
      following: this.following,
    };
  }
}
