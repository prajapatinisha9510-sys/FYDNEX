import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const errorParam = searchParams.get("error");

  if (errorParam || !code) {
    return NextResponse.redirect(
      `${origin}/creator/dashboard?instagram_error=1`
    );
  }

  try {
    const redirectUri = `${origin}/api/instagram/callback`;

    // Step 1: exchange the code for a short-lived access token
    const shortRes = await fetch(
      "https://api.instagram.com/oauth/access_token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID!,
          client_secret: process.env.INSTAGRAM_APP_SECRET!,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
          code,
        }),
      }
    );
    const shortData = await shortRes.json();

    if (!shortRes.ok || !shortData.access_token) {
      console.error("Instagram short-lived token error:", shortData);
      throw new Error("Failed to get short-lived token");
    }

    // Step 2: exchange the short-lived token for a long-lived one (60 days)
    const longRes = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_APP_SECRET}&access_token=${shortData.access_token}`
    );
    const longData = await longRes.json();

    if (!longRes.ok || !longData.access_token) {
      console.error("Instagram long-lived token error:", longData);
      throw new Error("Failed to get long-lived token");
    }

    // Step 3: find the currently logged-in Fydnex creator and save the token
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: Record<string, unknown>) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: Record<string, unknown>) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(`${origin}/creator/login`);
    }

    await supabase
      .from("creators")
      .update({
        instagram_connected: true,
        instagram_access_token: longData.access_token,
        instagram_user_id: String(shortData.user_id ?? ""),
      })
      .eq("id", user.id);

    return NextResponse.redirect(`${origin}/creator/dashboard`);
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(
      `${origin}/creator/dashboard?instagram_error=1`
    );
  }
}
