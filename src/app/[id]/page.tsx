"use client";

import React, { useState, useEffect } from "react";
import { useStory } from "@/context/Storycontext";
import Navbar from "../components/Navbar";
import StoryItem from "../components/StoryItem";

interface Params {
  id: string;
}

const StoryPage = ({ params }: { params: Promise<Params> }) => {
  const { stories } = useStory();
  const [storyId, setStoryId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setStoryId(resolvedParams.id);
    });
  }, [params]);

  const story = stories.find((story) => story.id === storyId);

  return (
    <div>
      <Navbar />
      <StoryItem story={story} />
    </div>
  );
};

export default StoryPage;
