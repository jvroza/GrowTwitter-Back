import { User } from ".";

export class Like {
  constructor(
    private author: User,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  public toJSON() {
    return {
      author: this.author,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
