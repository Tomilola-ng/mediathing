export interface FilesType {
  name: string;
  size: number;
  from: string;
  to: string | null;
  file_type: string;
  file: File;
  is_converted: boolean;
  is_converting: boolean;
  is_error: boolean;
  url: string | null;
  output: string | null;
}
