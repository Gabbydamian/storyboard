"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { useStory } from "@/context/Storycontext";
import EditStoryForm from "@/app/components/EditStoryForm";

interface Params {
  id: string;
}

const EditPage = ({ params }: { params: Promise<Params> }) => {
  const { stories, loading } = useStory();
  const [storyId, setStoryId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setStoryId(resolvedParams.id);
    });
  }, [params]);

  const story = stories.find((story) => story.id === storyId);

  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          {" "}
          <Navbar />
          <div className="container mx-auto p-4">
            <h1 className="text-center font-bold text-2xl mt-4">
              Edit {story?.title}
            </h1>
            <EditStoryForm  story={story}/>
          </div>
        </>
      )}
    </div>
  );
};

export default EditPage;
