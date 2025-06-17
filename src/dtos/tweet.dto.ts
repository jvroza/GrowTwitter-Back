export interface CreateTweetDto {
  authorId: string;
  content: string;
}

export type CreateReplyDto = CreateTweetDto & {
  replyTo: string;
};
