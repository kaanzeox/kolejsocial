import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import {
  BookmarkIcon,
  BookmarkIconFill,
  HomeIcon,
  HomeIconFill,
  PersonIcon,
  PersonIconFill,
} from "~/components/icons";
import { IconBaseProps } from "../icons/type";

const ProfileLink: React.FC<IconBaseProps> = (props) => {
  const { asPath } = useRouter();
  const { user } = useUser();
  const arrOfRoute = asPath.split("/");
  return arrOfRoute[1] === `@${user?.username}` ? (
    <PersonIconFill size={26.25} {...props} />
  ) : (
    <PersonIcon size={26.25} {...props} />
  );
};

const HomeLink: React.FC<IconBaseProps> = (props) => {
  const { route } = useRouter();
  return route === "/home" ? (
    <HomeIconFill size={26.25} {...props} />
  ) : (
    <HomeIcon size={26.25} {...props} />
  );
};

const BookmarkLink: React.FC<IconBaseProps> = (props) => {
  const { pathname } = useRouter();
  return pathname === "/i/bookmarks" ? (
    <BookmarkIconFill size={26.25} {...props} />
  ) : (
    <BookmarkIcon size={26.25} {...props} />
  );
};

export { ProfileLink, HomeLink, BookmarkLink };
