import { ArticleEntity } from './article';
import { IUid } from './uid';

export interface IProduct {
    name: string;
    description: string;
    articles: ArticleEntity[];
}

export interface ISelected {
    selected: boolean;
}

export type ProductEntity = IProduct & IUid & Partial<ISelected>;