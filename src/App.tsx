import React, {useCallback, useEffect, useState} from 'react';

import {INITIAL_POSTS_AMOUNT, INITIAL_POSTS_PAGE} from "./constants";
import useIsPageBottom from "hooks/useIsPageBottom";
import Post from "components/Post/Post";
import {IPostData, IPostsData, IPostsVariables} from "interfaces";
import 'main.sass';
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_ALL_POSTS} from "./queries";

function App() {
    const [isBottom, setIsBottom] = useIsPageBottom();
    const [postsPageNumber, setPostsPageNumber] = useState<number>(INITIAL_POSTS_PAGE);
    const [postsData, setPostsData] = useState<{ totalCount: number | null, posts: IPostData[] }>({
        posts: [],
        totalCount: null,
    });
    const {loading, data} = useQuery<IPostsData, IPostsVariables>(GET_ALL_POSTS, {
        variables: {
            options: {
                paginate: {
                    page: postsPageNumber,
                    limit: INITIAL_POSTS_AMOUNT,
                },
            },
        },
    });

    useEffect(function setPostsDataFromResponse() {
        if (!data) {
            return;
        }

        setPostsData(postsData => ({
                totalCount: data.posts.meta.totalCount,
                posts: postsData.posts.concat(data.posts.data),
            })
        );
    }, [data]);

    useEffect(function handleScrollingToPageBottom() {
        if (postsData.totalCount === postsData.posts.length || !isBottom || loading) {
            return;
        }

        setIsBottom(false);
        setPostsPageNumber(n => n + 1);
    }, [loading, isBottom, setIsBottom, postsPageNumber, postsData]);

    return (
        <div className="container">{
            postsData.posts.map(post => (
                <Post key={post.id} title={post.title} content={post.body} user={post.user}/>
            ))
        }
            {loading && 'Loading...'}
        </div>
    );
}

export default App;
