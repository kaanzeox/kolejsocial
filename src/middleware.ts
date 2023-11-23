import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/api/trpc/post.timeline",
    "/api/trpc/profile.getUserRandomUser",
    "/api/trpc/profile.getUserRandomUser,post.timeline",
    "/api/trpc/post.timeline,profile.getUserRandomUser",
  ],
  ignoredRoutes: [
    "/favicon.ico",
    "/fonts/chirp-medium-web.woff",
    "/fonts/chirp-bold-web.woff",
    "/fonts/chirp-regular-web.woff",
  ],
});

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
