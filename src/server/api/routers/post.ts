import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { addUserDataToPosts } from "~/server/helper/dbHelper";
import { tweetSchema } from "~/utils/validation";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
});

export const postRouter = createTRPCRouter({
  detailPost: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      await ctx.prisma.post.update({
        where: { id: input.id },
        data: {
          view: {
            increment: 1,
          },
        },
      });
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
      });

      if (!post) throw new TRPCError({ code: "NOT_FOUND" });

      return (await addUserDataToPosts([post]))[0];
    }),

  postViews: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.post.findUnique({
        where: { id: input.id },
        select: { view: true, createdAt: true },
      });
    }),

  deletePost: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.delete({
        where: { id: input.id },
      });

      if (post) {
        await ctx.prisma.repost.deleteMany({
          where: { postId: post.parentId ?? input.id, userId: ctx.userId },
        });
        await ctx.prisma.post.deleteMany({
          where: {
            parentId: input.id,
            authorId: ctx.userId,
            AND: { type: "REPOST" },
          },
        });
      } else {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return post;
    }),

  bookmarks: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const bookmarks = await ctx.prisma.bookmark.findMany({
        where: { postId: input.postId },
      });
      if (!bookmarks) throw new TRPCError({ code: "NOT_FOUND" });

      return bookmarks;
    }),

  timeline: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ ctx, input: { limit = 30, cursor } }) => {
      const posts = await ctx.prisma.post
        .findMany({
          take: limit + 1,
          cursor: cursor ? { createdAt_id: cursor } : undefined,
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        })
        .then(addUserDataToPosts);

      let nextCursor: typeof cursor | undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        if (nextItem != null) {
          nextCursor = {
            id: nextItem?.post.id,
            createdAt: nextItem?.post?.createdAt,
          };
        }
      }
      return {
        posts,
        nextCursor,
      };
    }),

  parentPost: privateProcedure
    .input(z.object({ parentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const parent = await ctx.prisma.post.findUnique({
        where: { id: input.parentId },
      });

      if (!parent) throw new TRPCError({ code: "NOT_FOUND" });

      return (await addUserDataToPosts([parent]))[0];
    }),

  createPost: privateProcedure
    .input(tweetSchema)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const { success } = await ratelimit.limit(authorId);
      if (!success)
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too Many Request",
        });

      const post = await ctx.prisma.post.create({
        data: {
          authorId,
          content: input.content,
          image: input.image?.secure_url,
          imageId: input.image?.public_id,
          type: input.type,
        },
      });
      return post;
    }),

  postReplies: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.reply
        .findMany({
          where: { parentId: input.postId },
          include: { post: true },
          orderBy: [{ createdAt: "desc" }],
        })
        .then((replise) => replise.map((reply) => reply.post))
        .then(addUserDataToPosts);
    }),
});
