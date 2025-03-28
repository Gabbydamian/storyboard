import { getUser } from "@/actions/userActions";

export async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div data-user={user ? "authenticated" : "unauthenticated"}>{children}</div>
  );
}
