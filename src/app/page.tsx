import { createClient } from "@/utils/supabase/server";
import HomeComponent from "@/app/components/HomeComponent";


export default async function Home() {

  const supabase = await createClient();
  const { data: stories, error } = await supabase.from('stories').select();
  if (error) {
    console.error(error);
    return <div>Error loading stories</div>;
  }
  console.log(stories);
  return (
    <HomeComponent stories={stories || []}/>
  );
}