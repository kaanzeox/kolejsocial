import { useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { TweetProps } from "../tweet-post";
import { CommentIcon, LikeIcon } from "~/components/icons";

export const ReplyTweet: React.FC<Omit<TweetProps, "author">> = ({
  variant,
  className,
  post,
  ...props
}) => {
  return (
    <div className="flex w-full flex-1 text-accent">
      <div
        className="group flex items-center"
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <Button
          variant="ghost"
          type="button"
          size="icon"
          className={cn(
            "group/button z-10 -mr-2 flex border-2 transition-all ease-in last:mr-0",
            "hover:bg-primary/10 focus-visible:border-primary/50 focus-visible:bg-primary/10 group-hover:bg-primary/10"
          )}
        >
          <CommentIcon
            className={cn(
              "h-5 w-5",
              variant === "details" && "h-6 w-6",
              "fill-accent transition duration-300 group-hover:fill-primary group-focus-visible/button:fill-primary"
            )}
          />
          <span className="sr-only">like</span>
        </Button>
        <span
          className={cn(
            "h-fit pl-0.5 font-sans text-[13px] leading-4 xs:px-2 md:cursor-pointer",
            "font-normal transition duration-300 group-hover:text-primary group-focus:text-primary"
          )}
        >
          ??
        </span>
      </div>
    </div>
  );
};
