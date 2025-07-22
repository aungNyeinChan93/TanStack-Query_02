import { useQuery } from "@tanstack/react-query";
import React from "react";
import postQueryOption from "../../queryOptions/postsQueryOption";

const TestPosts = () => {
    const { data: posts } = useQuery(postQueryOption({}, { staleTime: 6000 }));
    const { data: limit } = useQuery(
        postQueryOption({ page: 5, limit: 20 }, { staleTime: 6000 })
    );
    const { data: page2 } = useQuery(
        postQueryOption({ page: 6 }, { staleTime: 6000 })
    );
    const { data: post } = useQuery(
        postQueryOption({ id: 3 }, { staleTime: 6000 })
    );
    console.log(posts);
    console.log(post);
    console.log(page2);
    console.log(limit);

    return (
        <React.Fragment>
            <section></section>
        </React.Fragment>
    );
};

export default TestPosts;
