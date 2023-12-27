import { getUserNameByEmail } from "@/server/actions/user";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  if (session && session.user && session.user.email) {
    const data = await getUserNameByEmail(session.user.email);
    console.log(data);
    if (data.success) {
      console.log(data.result);
    }
  }

  return <main></main>;
}
