"use server";

import { User } from "@/types/user";
import { supabase } from "@/lib/supabse";

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    throw new Error("No user logged in");
  }

  const supabaseUser = data.user;
  const formattedUser: User = {
    id: supabaseUser.id,
    email: supabaseUser.email ?? "",
    createdAt: supabaseUser.created_at ?? "",
    lastSignInAt: supabaseUser.last_sign_in_at ?? "",
    role: supabaseUser.role ?? "user",
    emailVerified: true,
    user_metadata: { displayName: "", ...supabaseUser.user_metadata },
  };

  return formattedUser;
}

// export async function sessionListener() {
//   const { data: authListener } = supabase.auth.onAuthStateChange(
//     async (_event, session) => {
//       if (session?.user) {
//         await getUser();
//       } else {
//         await supabase.auth.signOut();
//       }
//     }
//   );

//   return () => {
//     authListener?.subscription?.unsubscribe();
//   };
// }
export async function signInUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign-in error:", error);
      return { error: "Invalid email or password. Please try again." };
    }

    if (!data?.session) {
      return { error: "Authentication failed. Please try again." };
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
    return { success: true };
  } catch (error) {
    console.error("Unexpected sign-in error:", error);
    return { error: "An unexpected error occurred during sign-in." };
  }
}

export async function signOutUser() {
  await supabase.auth.signOut();
}

export async function signUpUser(
  email: string,
  password: string,
  displayName: string
) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { displayName },
    },
  });

  if (error) throw new Error(error.message);
}

export async function resetUserPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/update-password",
  });

  if (error) throw new Error(error.message);
}
