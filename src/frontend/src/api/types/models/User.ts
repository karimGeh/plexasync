import { UserRoles } from "../Enums";

export interface UserType {
  id: string;
  username: string;
  password: string;
  email: string;
  full_name: string;
  role: UserRoles;
  avatar_uri: string;

  created_at: Date;
  updated_at: Date;
  last_login: Date;
}
