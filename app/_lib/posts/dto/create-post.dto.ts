export interface CreatePostDto {
  title: string;
  content: string;
  spoiler: string;
  tags?: string[];
}
