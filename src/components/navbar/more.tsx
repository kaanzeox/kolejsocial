import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { AdsIcon, AnalyticIcon, LogOutIcon } from "../icons";
import { LogoutModal } from "../modal";
import { UserResource } from "@clerk/types/dist";
import { SettingsAndSupport } from "~/constant";
import { cn } from "~/lib/utils";

type TYPE = "mobile" | "dekstop";

interface MoreProps {
  user: UserResource | null | undefined;
  type: TYPE;
}

export const MoreNavbar: React.FC<MoreProps> = ({ user, type }) => {
  return (
    <Accordion type="multiple" className="text-[18px] font-semibold leading-5">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="p-4">Creator Studio</AccordionTrigger>
        <AccordionContent asChild className="pb-0">
          <button className="flex w-full items-center p-3 hover:bg-border/30 focus-visible:border-primary focus-visible:bg-white/[.03]">
            <AnalyticIcon size="18.75" className="mr-3 fill-current" />
            Analytic
          </button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-none">
        <AccordionTrigger className="p-4">Professional Tools</AccordionTrigger>
        <AccordionContent className="p-0">
          <button className="flex w-full items-center p-3 hover:bg-border/30 focus-visible:border-primary focus-visible:bg-white/[.03]">
            <AdsIcon className="mr-3 fill-current" size="18.75" />
            Ads
          </button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="border-none">
        <AccordionTrigger className="p-4">
          Settings and Support
        </AccordionTrigger>
        <AccordionContent className="p-0 duration-0">
          {SettingsAndSupport.map(
            (btn) =>
              (type === "mobile" || btn.name !== "Data Saver") && (
                <button
                  key={btn.name}
                  className={cn(
                    "flex w-full p-3 hover:bg-border/30 focus-visible:border-primary focus-visible:bg-white/[.03]"
                  )}
                >
                  <btn.icon size="18.75" className="mr-3" />
                  {btn.name}
                </button>
              )
          )}
          {type === "mobile" && (
            <LogoutModal user={user}>
              <button className="flex w-full p-3 hover:bg-border/30 focus-visible:border-primary focus-visible:bg-white/[.03]">
                <LogOutIcon size="18.75" className="mr-3" />
                Log Out @{user?.username}
              </button>
            </LogoutModal>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
