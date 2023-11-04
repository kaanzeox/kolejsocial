import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import React from "react";

import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import Feed from "~/components/layouts/feed";
import { CreateTweet } from "~/components/form";
import { Logo } from "~/components/icons/navbar-icon";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const { data, isLoading: postLoading } = api.posts.getAll.useQuery();

  if (!userLoaded)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Logo width={192} height={192} />
      </div>
    );

  return (
    <PageLayout className="flex">
      <div className="flex w-full max-w-[600px] flex-shrink flex-col border-x border-border">
        <div className="sticky top-0 z-10 h-auto w-full min-w-[300px] border-b border-border bg-dark/70 backdrop-blur-sm">
          <div className="flex h-[53px] items-center">
            <div className="relative  flex h-full w-full flex-1 items-center justify-center px-4 font-semibold hover:cursor-pointer hover:bg-white/10">
              <div className="relative flex h-full w-fit items-center">
                For You
                <span className="absolute -left-0.5 bottom-0 h-1 w-[108%] rounded-md bg-primary" />
              </div>
            </div>
            <div className="relative flex h-full w-full flex-1 items-center justify-center px-4 font-medium text-accent hover:cursor-pointer hover:bg-white/10">
              Following
            </div>
          </div>
        </div>
        <div className="hidden border-b border-border xs:flex">
          {isSignedIn ? <CreateTweet /> : null}
        </div>
        {!!data && <Feed post={data} postLoading={postLoading} />}
      </div>
    </PageLayout>
  );
};

export default Home;
