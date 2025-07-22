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

export interface FindTweet {
  tweetId: string;
  authorId: string;
}
