export interface User {
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'USER';
  username: string;
  password: string;
}
