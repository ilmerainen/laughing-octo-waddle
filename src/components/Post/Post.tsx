import React from 'react';

import {IUser} from "interfaces";

interface IProps {
    title: string;
    content: string;
    user: IUser;
}

const Post: React.FC<IProps> = ({title, content, user}) => {
    return <div className="card">
        <div className="card-content">
            <p className="title is-4">{title}</p>
            <p className="subtitle is-6">{user && user.email}</p>
            <div className="content">{content}</div>
        </div>
    </div>
};

export default Post;
