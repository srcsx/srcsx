import { CookieUserDataType, UserDataType } from "@/types/user";
import { cookies } from "next/headers";

export async function getUserData(): Promise<UserDataType> {
  const cookie = (await cookies()).get("user-storage")?.value;

  const c = cookie ? (JSON.parse(cookie) as CookieUserDataType) : null;

  return c !== null ? c.state.user : { majorId: undefined, year: undefined };
}
