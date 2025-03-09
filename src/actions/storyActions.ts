"use server";
import { supabase } from "@/lib/supabse";
import { Story } from "@/types/story";

export async function getStories() {
  const { data, error } = await supabase.from("stories").select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data || [];
}

export async function deleteStory(id: string) {
  const { error } = await supabase.from("stories").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return getStories();
}

export async function addStory(story: Partial<Story>) {
  const { error } = await supabase.from("stories").insert([story]);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return getStories();
}

export async function updateStory(story: Partial<Story>, id: string) {
  const { error } = await supabase.from("stories").update(story).eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return getStories();
}
