import { User, UserDto } from ".";

export interface LikeDto {
  author: UserDto;
  createdAt: Date;
  updatedAt: Date;
}

export class Like {
  constructor(
    private author: User,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  public toJSON(): LikeDto {
    return {
      author: this.author.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
