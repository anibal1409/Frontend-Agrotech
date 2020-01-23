import { User } from '../models/user.model';

export interface IAuthData {
  access_token: string;
  expiresIn: number;
  user: User;
}
