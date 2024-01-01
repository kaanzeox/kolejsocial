import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { BurgerMenu, PageLayout, Feed } from "~/components/layouts";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { LoadingItem, LoadingPage } from "~/components/loading";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { SEO } from "~/components/simple-seo";

const LazyForm = dynamic(() => import("~/components/form"));

const Home: NextPage = () => {
  const { isLoaded } = useUser();
  const showBurgerMenu = useMediaQuery("(max-width: 570px)");

  if (!isLoaded) <LoadingPage />;

  const { ref, inView } = useInView({
    rootMargin: "40% 0px",
  });

  const {
    data,
    isLoading: postLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.post.timeline.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  if (hasNextPage && inView && !postLoading) {
    fetchNextPage();
  }

  return (
    <>
      <SEO title="Home / burbir" />
      <PageLayout className="flex">
        <div className="flex w-full max-w-[600px] flex-shrink flex-col border-x border-border">
          {showBurgerMenu && <BurgerMenu />}
          <div className="sticky top-0 z-[25] h-auto w-full border-b border-border bg-background/[.65] backdrop-blur-md">
            <div className="flex h-[53px] items-center">
              <div className="relative  flex h-full w-full flex-1 items-center justify-center px-4 font-semibold hover:cursor-pointer">
                <div className="relative flex h-full w-fit items-center">
                  For You
                  <span className="absolute -left-0.5 bottom-0 h-1 w-[108%] rounded-md bg-primary" />
                </div>
              </div>
              <div className="relative flex h-full w-full flex-1 items-center justify-center px-4 font-medium text-accent hover:cursor-pointer">
                Following
              </div>
            </div>
          </div>
          {!showBurgerMenu && (
            <div className="hidden border-b border-border min-[570px]:flex">
              <LazyForm />
            </div>
          )}
          <Feed
            post={data?.pages.flatMap((page) => page.posts)}
            postLoading={postLoading}
          />
          {inView && isFetchingNextPage && <LoadingItem />}
          {hasNextPage && !isFetchingNextPage && <div ref={ref} />}
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
