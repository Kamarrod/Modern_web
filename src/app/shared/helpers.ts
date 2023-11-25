export enum Role {
  User = 'User',
  Admin = 'Admin',
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: Role;
  accessToken?: string;
  //refreshToken: string;
  refreshToken: string;
  update_date: Date;
}
