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

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  roles: Role[];
  token?: string;
  image?: File;
  imagePath: string;
}

/* The `AuthUser` interface is defining the shape of an authenticated user object in the application.
  It has the following properties: */
export type AuthUser = Pick<User, 'id' | 'username' | 'roles' | 'token'>;

/* The `AuthRequest` interface is defining the shape of an authentication request object in the
  application. It has two properties: `username` and `password`, both of which are of type string.*/
export type AuthRequest = Pick<User, 'username' | 'password'>;

