import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useApolloClient} from "@apollo/client";

import {INITIAL_POSTS_AMOUNT} from "./constants";
import Post from "components/Post/Post";
import {IPostData, IPostsData, IPostsVariables} from "interfaces";
import {GET_ALL_POSTS} from "queries";
import 'main.sass';

function App() {
    const root = useRef<HTMLDivElement>(null);
    const [postsData, setPostsData] = useState<{ totalCount: number | null, posts: IPostData[], loading: boolean }>({
        posts: [],
        totalCount: null,
        loading: false,
    });

    const apolloClient = useApolloClient();

    const getPosts = useCallback(() => {
        console.log(postsData.posts.length / INITIAL_POSTS_AMOUNT + 1)
        if (postsData.loading) {
            return;
        }

        setPostsData(postsData => ({
            ...postsData,
            loading: true,
        }));

        apolloClient.query<IPostsData, IPostsVariables>({
            query: GET_ALL_POSTS,
            variables: {
                options: {
                    paginate: {
                        page: postsData.posts.length / INITIAL_POSTS_AMOUNT + 1,
                        limit: INITIAL_POSTS_AMOUNT,
                    },
                },
            },
        }).then(results => {
            setPostsData(postsData => {
                return {
                    ...postsData,
                    posts: postsData.posts.concat(results.data.posts.data),
                    totalCount: results.data.posts.meta.totalCount,
                    loading: false,
                };
            });
        })
            .catch(test => console.log(test));
    }, [apolloClient, postsData]);

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];

        if (target.isIntersecting) {
            if (postsData.totalCount && postsData.posts.length === postsData.totalCount) {
                return;
            }

            getPosts();
        }
    }, [getPosts, postsData]);

    useEffect(() => {
        const io = new IntersectionObserver(handleObserver, {
            root: null,
            threshold: 1,
        });
        const target = root.current!;
        io.observe(target);

        return () => io.unobserve(target);
    }, [root, handleObserver]);

    return (
        <div className="container">{
            postsData.posts.map(post => (
                <Post key={post.id} title={post.title} content={post.body} user={post.user}/>
            ))
        }
            <div style={{visibility: postsData.loading ? 'visible' : 'hidden'}} ref={root}>Loading...</div>
        </div>
    );
}

export default App;
