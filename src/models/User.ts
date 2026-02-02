export interface User {
  id: number;
  name: string;
  fullname: string;
  status: string;
  level: number;
  avatar: string;
  sessionToken?: string;
}