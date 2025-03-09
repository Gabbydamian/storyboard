"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  getStories,
  addStory,
  deleteStory,
  updateStory,
} from "@/actions/storyActions";
import { Story } from "@/types/story";

interface StoryContextType {
  stories: Story[];
  loading: boolean;
  error: string | null;
  deleteStory: (id: string) => Promise<void>;
  addStory: (story: Story) => Promise<void>;
  updateStory: (story: Story, id: string) => Promise<void>;
}

const StoryContext = createContext<StoryContextType | null>(null);

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStories();
        setStories(data);
      } catch (err) {
        setError("Failed to fetch stories.");
        console.log("Error fetching data", err);
        
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDeleteStory = async (id: string) => {
    startTransition(async () => {
      try {
        const updatedStories = await deleteStory(id);
        setStories(updatedStories);
      } catch (err) {
        setError("Failed to delete story.");
        console.log("Failed to delete story.", err);
        
      }
    });
  };

  const handleAddStory = async (story: Story) => {
    startTransition(async () => {
      try {
        const updatedStories = await addStory(story);
        setStories(updatedStories);
      } catch (err) {
        setError("Failed to add story.");
        console.log("Failed to add story", err);
        
      }
    });
  };

  const handleUpdateStory = async (story: Partial<Story>, id: string) => {
    startTransition(async () => {
      try {
        const updatedStories = await updateStory(story, id);
        setStories(updatedStories);
      } catch (err) {
        console.log("Failed to update story", err)
        setError("Failed to update story.");
      }
    });
  };

  return (
    <StoryContext.Provider
      value={{
        stories,
        loading,
        error,
        deleteStory: handleDeleteStory,
        addStory: handleAddStory,
        updateStory: handleUpdateStory,
      }}
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
