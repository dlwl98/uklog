export interface CreatePostDto {
  title: string;
  content: string;
  spoiler: string;
  isPrivate: boolean;
  tags?: string[];
}
