export interface UpdatePostDto {
  title?: string;
  content?: string;
  spoiler?: string;
  isPrivate?: boolean;
  tags?: string[];
  createdAt?: Date;
}
