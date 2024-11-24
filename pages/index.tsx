import Head from "next/head";
import FeaturedPost from "../components/FeaturedPost";
import { Post, PostService } from "t-basilio-sdk";
import { GetServerSideProps } from "next";
import { ServerResponse } from "http";
import PostCard from "../components/PostCard";
import PostsGrid from "../components/PostsGrid";
import PageGrid from "../components/PageGrid";
import ReactPaginate from "react-paginate";
import Router from "next/router";

interface HomeProps {
  posts?: Post.Paginated;
}

export default function Home(props: HomeProps) {
  const { posts } = props;
  return (
    <PageGrid>
      <Head>
        <title>AlgaNews</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {posts?.content && <FeaturedPost postSummary={posts?.content[0]} />}
      <PostsGrid>
        {posts?.content?.slice(1).map((p) => {
          return <PostCard key={p.id} post={p} />;
        })}
      </PostsGrid>

      <ReactPaginate
        containerClassName={"Pagination"}
        pageCount={posts?.totalPages || 0}
        marginPagesDisplayed={0}
        pageRangeDisplayed={3}
        previousLabel={"<"}
        nextPageRel={">"}
        hrefBuilder={(page) => `/?page=${page}`}
        onPageChange={(page) => {
          Router.push(`/?page=${page.selected + 1}`);
        }}
      />
    </PageGrid>
  );
}

function sendToHomePage(res: ServerResponse) {
  res.statusCode = 302;
  res.setHeader("Location", "/?page=1");
  return { props: {} };
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  { res, query}
) => {
  
  const { page: _page } = query;

  const page = _page ? Number(_page) : 1;

  if (isNaN(page) || page < 1) {
    return sendToHomePage(res)
  }

  const posts = await PostService.getAllPosts({ page: Number(page) - 1 });

  if (!posts.content?.length) {
    return sendToHomePage(res);
  }

  return {
    props: {
      posts,
    },
  };
};

