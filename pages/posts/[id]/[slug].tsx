import { Post, PostService } from "t-basilio-sdk";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ResourceNotFoundError } from "t-basilio-sdk/dist/errors";
import Head from "next/head";
import PostHeader from "../../../components/PostHeader";
import Markdown from "../../../components/Markdown";
import { DiscussionEmbed } from "disqus-react";

interface PostProps extends NextPageProps {
  post?: Post.Detailed;
  host?: string;
}

export default function PostPage(props: PostProps) {
  
  const { post } = props;

  return (
    <>
      <Head>
        <meta property="og:title" content={post?.title} />
        <meta property="og:site_name" content="AlgaNews" />
        <meta property="og:url" content="alganews.com.br" />
        <meta property="og:description" content={post?.body.slice(0, 54)} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post?.imageUrls.medium} />
        <title>{post?.title} - AlgaNews</title>
        <link
          rel="canonical"
          href={`http://${props.host}/posts/${props.post?.id}/${props.post?.slug}`}
        />
      </Head>

      {post && (
        <>
          <PostHeader
            thumbnail={post?.imageUrls.large}
            createdAt={post?.createdAt}
            editor={post?.editor}
            title={post?.title}
          />
          <Markdown>{post.body}</Markdown>
          <DiscussionEmbed
            shortname="alganews-19"
            config={{
              url: `http://${props.host}/posts/${props.post?.id}/${props.post?.slug}`,
              identifier: String(post.id),
              title: post.title,
              language: "pt_BR", //e.g. for Traditional Chinese (Taiwan)
            }}
          />
        </>
      )}
    </>
  );
}

interface Params extends ParsedUrlQuery {
  id: string;
  slug: string;
}

export const getServerSideProps: GetServerSideProps<
  PostProps,
  Params
> = async ({ params, req }) => { // desestruturar o res se precisar
  try {
    if (!params) return { notFound: true };

    const { id } = params;
    const postId = Number(id);

    if (isNaN(postId)) return { notFound: true };

    const post = await PostService.getExistingPost(postId);

    return {
      props: {
        post,
        host: req.headers.host,
      },
    };

  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return { notFound: true };
    }

    return {
      props: {
        error: {
          message: error.message,
          statusCode: error.data?.status || 500,
        },
      },
    };
  }
};
