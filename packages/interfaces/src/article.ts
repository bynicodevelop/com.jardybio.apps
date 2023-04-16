import { IUid } from './uid';

export interface IArticle {
    title: string;
    content: string | null;
    slug: string | null;
}

export type ArticleEntity = IArticle & IUid;