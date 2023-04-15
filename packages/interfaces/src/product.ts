import { IUid } from './uid';

export interface IProduct {
    name: string;
    description: string;
}

export type ProductEntity = IProduct & IUid;