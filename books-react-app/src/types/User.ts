/* The `UserState` interface is defining the shape of the state object for managing user-related data
in an application. It has the following properties: */
export interface UserState {
  users: User[];
  user: User | null;
  authUser?: AuthUser;
  errorMessage?: string;
  successMessage?: string;
  loading: boolean;
}

export type Role = 'ADMIN' | 'USER';

/* The `AuthUser` interface is defining the shape of an authenticated user object in the application.
  It has the following properties: */
export interface AuthUser {
  id?: string;
  username: string;
  roles: Role[];
  token?: string;
}

export interface User extends AuthUser {
  id: string;
  fullname: string;
  password: string;
  email: string;
  image?: File;
  imagePath: string;
}

/* The `AuthRequest` interface is defining the shape of an authentication request object in the
  application. It has two properties: `username` and `password`, both of which are of type string.*/
export interface AuthRequest {
  username: string;
  password: string;
}

