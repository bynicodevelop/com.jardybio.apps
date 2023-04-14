import { IToken } from './token';

export interface IAuth {
    login: string;
    password: string;
    token?: IToken;
}