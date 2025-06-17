export interface CreateUserDto {
  name: string;
  username: string;
  password: string;
  imageUrl?: string;
}

export interface ToogleFollow {
  followerId: string;
  followingId: string;
}
