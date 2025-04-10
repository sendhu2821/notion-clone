import { auth } from "@clerk/nextjs/server";

const layout = ({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  auth.protect();

  return <div>{children}</div>;
};
export default layout;
