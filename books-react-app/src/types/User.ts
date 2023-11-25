export type IUser = {
    id: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    roles: string[];
    image?: File;
    imagePath: string;
    token?: string;
};

export const initialUser: IUser = {
    id: '',
    fullname: '',
    username: '',
    email: '',
    password: '',
    roles: ['user'],
    image: undefined,
    imagePath: '',
};
