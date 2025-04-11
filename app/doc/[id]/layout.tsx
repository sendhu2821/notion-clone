import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
};
export default layout;
