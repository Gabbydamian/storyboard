"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { newClient } from "@/utils/supabase/server";
import { Story } from "@/types/story";

interface StoryContextType {
  stories: Story[];
  loading: boolean;
  error: unknown | string;
  deleteStory: (id: string) => Promise<void>;
  addStory: (story: Story) => Promise<void>;
  updateStory: (story: Story) => Promise<void>;
}

const StoryContext = createContext<StoryContextType | null>(null);

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | string>("");

  useEffect(() => {
    const fetchStories = async () => {
      const supabase = await newClient();
      const { data, error } = await supabase.from("stories").select();
      if (error) {
        setError(error);
      } else {
        setStories(data || []);
      }
      setLoading(false);
    };
    fetchStories();
  }, []);

  const deleteStory = async (id: string) => {
    const supabase = await newClient();
    const { error } = await supabase.from("stories").delete().eq("id", id);
    if (error) {
      console.error(error);
      return;
    }
    setStories((prevStories) => prevStories.filter((story) => story.id !== id));
  };

  const addStory = async (story: Story) => {
    const supabase = await newClient();
    const { error } = await supabase.from("stories").insert([story]);

    if (error) {
      console.error(error);
      return;
    }

    const { data, error: fetchError } = await supabase.from("stories").select();

    if (fetchError) {
      console.error(fetchError);
      return;
    }

    setStories(data || []);
  };

  const updateStory = async (story: Story) => {
    const supabase = await newClient();
    const { error } = await supabase
      .from("stories")
      .update(story)
      .eq("id", story.id);

    if (error) {
      console.error(error);
      return;
    }

    const { data, error: fetchError } = await supabase.from("stories").select();

    if (fetchError) {
      console.error(fetchError);
      return;
    }

    setStories(data || []);
  }

  return (
    <StoryContext.Provider
      value={{ stories, loading, error, deleteStory, addStory, updateStory }}
    >
      {children}
    </StoryContext.Provider>
  );
}

export function useStory() {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
}
