import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AboutPage() {
  const session = await getServerSession(authOptions);

  return (
    <div style={{ padding: 10 }}>
      <h3>
        This is about server page, where I am accessing the current session
      </h3>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}