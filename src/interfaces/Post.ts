import {IUser} from "./User";

export interface IPostData {
    id: string;
    title: string;
    body: string;
    user: IUser;
}

export interface IPostsData {
    posts: {
        data: IPostData[];
        meta: {
            totalCount: number;
        };
    }
}

export interface IPostsVariables {
    options: {
        paginate: {
            page: number;
            limit: number;
        }
    }
}
