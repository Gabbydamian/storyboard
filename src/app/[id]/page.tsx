"use client";

import React from "react";
import { useStory } from "@/context/Storycontext";
import Navbar from "../components/Navbar";
import StoryItem from "../components/StoryItem";

interface Params {
  id: string;
}

const StoryPage = ({ params }: { params: Params }) => {
  const { stories } = useStory();
  const id = params.id;
  const story = stories.find((story) => story.id === id);

  return (
    <div>
      <Navbar />
      <StoryItem story={story} />
    </div>
  );
};

export default StoryPage;
