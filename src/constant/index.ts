import * as icon from "~/components/icons";

const navbarLink = [
  { name: "Home", icon: icon.HomeIcon, link: "/" },
  { name: "Explore", icon: icon.SearchIcon, link: "#explore" },
  { name: "Notifications", icon: icon.BellIcon, link: "/#notification" },
  { name: "Messages", icon: icon.MessageIcon, link: "#messages" },
  { name: "Lists", icon: icon.ListIcon, link: "/#list" },
  { name: "Bookmarks", icon: icon.BookmarkIcon, link: "#bookmark" },
  { name: "Communities", icon: icon.GroupIcon, link: "/#group" },
  { name: "Premium", icon: icon.LogoIcon, link: "/#premium" },
  { name: "Profile", icon: icon.PersonIcon, link: "/profile" },
  { name: "More", icon: icon.MenuIcon, link: "/#more" },
];

const hamburgerNavbarLink = [
  { name: "Profile", icon: icon.PersonIcon, link: "/profile" },
  { name: "Premium", icon: icon.LogoIcon, link: "#premium" },
  { name: "Lists", icon: icon.ListIcon, link: "#list" },
  { name: "Bookmarks", icon: icon.BookmarkIcon, link: "#bookmark" },
  { name: "Communities", icon: icon.GroupIcon, link: "#group" },
  { name: "Monetization", icon: icon.MonetIcon, link: "#monetization" },
];

const userMenu = [
  { name: "Posts", href: "" },
  { name: "Replies", href: "/with_replies" },
  { name: "Highlights", href: "/hightlights" },
  { name: "Media", href: "/media" },
  { name: "Likes", href: "/likes" },
];

const TweetButton = [
  { name: "Reply", icon: icon.CommentIcon, action: null },
  { name: "Repost", icon: icon.RetweetIcon, action: null },
  { name: "Like", icon: icon.LikeIcon, action: null },
  { name: "Analytic", icon: icon.AnalyticIcon, action: null },
  { name: "Bookmark", icon: icon.BookmarkIcon, action: null },
  { name: "Share", icon: icon.ShareIcon, action: null },
];

const createTweetActions = [
  { name: "GIF", icon: icon.GifIcon },
  { name: "Poll", icon: icon.PollIcon },
  { name: "Emoji", icon: icon.EmojiIcon },
  { name: "Schedule", icon: icon.ScheduleIcon },
  { name: "Location", icon: icon.LocationIcon },
];

export {
  navbarLink,
  TweetButton,
  createTweetActions,
  userMenu,
  hamburgerNavbarLink,
};
