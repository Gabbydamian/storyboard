"use client";

import React from "react";
import Navbar from "./Navbar";
import StoryList from "./StoryList";
import { PrivateRoute } from "./PrivateRoute";
import { useStory } from "@/context/Storycontext";

const HomeComponent = () => {
  const { stories } = useStory();
  return (
    <PrivateRoute>
      <Navbar />
      <h1 className="text-center text-4xl font-bold my-16">
        Explore our Best Stories
      </h1>
      <StoryList stories={stories || []} />
    </PrivateRoute>
  );
};

export default HomeComponent;
