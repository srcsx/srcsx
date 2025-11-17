import { getUserData } from "@/utils/userData";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();

  if (!user?.majorId || !user?.year) {
    const headersList = await headers();
    const header_url = headersList.get("x-redirect-url") || "";

    return redirect("/setup?next=" + header_url);
  }

  return children;
}
