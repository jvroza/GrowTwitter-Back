export interface CreateTweetDto {
  authorId: string;
  content: string;
}

export type CreateReplyDto = CreateTweetDto & {
  replyTo: string;
};

export interface UpdateTweetDto extends CreateTweetDto {
  tweetId: string;
}

export interface FindTweetDto {
  tweetId: string;
}

export interface DeleteTweetDto extends FindTweetDto {
  authorId: string;
}
