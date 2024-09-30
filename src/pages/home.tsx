import React from "react";
import { api } from "~/utils/api";
import dynamic from "next/dynamic";
import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import { useMediaQuery } from "usehooks-ts";
import { SEO } from "~/components/simple-seo";
import { useInView } from "react-intersection-observer";
import { LoadingItem, LoadingPage } from "~/components/loading";
import { PageLayout, Feed } from "~/components/layouts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, MessageCircle, Search, Users } from "lucide-react";

const LazyForm = dynamic(() => import("~/components/form/post-form"));

const Home: NextPage = () => {
  const { isLoaded, user } = useUser();
  const ctx = api.useUtils();
  const showMobileMenu = useMediaQuery("(max-width: 768px)");

  if (!isLoaded) return <LoadingPage />;

  const { ref, inView } = useInView({
    rootMargin: "40% 0px",
  });

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: postLoading,
  } = api.post.timeline.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  if (hasNextPage && inView && !postLoading) {
    fetchNextPage();
  }

  return (
    <>
      <SEO title="Ana Sayfa | Üniversite Sosyal" />
      <PageLayout className="flex bg-gradient-to-b from-primary/10 to-background">
        <div className="flex w-full max-w-4xl flex-shrink flex-col mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Hoş Geldin, {user?.firstName}!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Input placeholder="Üniversite hayatınızda neler oluyor?" className="flex-grow" />
                <Button>Paylaş</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="herkes" className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="herkes" className="flex-1">Herkes</TabsTrigger>
                  <TabsTrigger value="arkadaslar" className="flex-1">Arkadaşlar</TabsTrigger>
                  <TabsTrigger value="fakulte" className="flex-1">Fakülte</TabsTrigger>
                </TabsList>
                <TabsContent value="herkes">
                  <Feed
                    post={data?.pages.flatMap((page) => page.posts)}
                    postLoading={postLoading}
                  />
                  {inView && isFetchingNextPage && <LoadingItem />}
                  {hasNextPage && !isFetchingNextPage && <div ref={ref}></div>}
                </TabsContent>
                <TabsContent value="arkadaslar">Arkadaş gönderileri burada görünecek</TabsContent>
                <TabsContent value="fakulte">Fakülte gönderileri burada görünecek</TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Kampüs Etkinlikleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Bahar Şenliği - 15 Mayıs</li>
                    <li>Kariyer Günleri - 20-22 Mayıs</li>
                    <li>Mezuniyet Töreni - 30 Haziran</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Hızlı Erişim</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <Bell className="mr-2 h-4 w-4" />
                      Duyurular
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Mesajlar
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Gruplar
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Search className="mr-2 h-4 w-4" />
                      Arama
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Home;