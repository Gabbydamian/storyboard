  // import { createServerClient } from '@supabase/ssr'
  import { createClient } from "@supabase/supabase-js"

  export async function newClient() {

    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }