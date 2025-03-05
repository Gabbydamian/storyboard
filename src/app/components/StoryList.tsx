import React from "react";
import StoryItem from "@/app/components/Story";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusSquareIcon } from "lucide-react";
import { useStory } from "@/context/Storycontext";

const StoryList: React.FC = () => {
  const { stories, loading } = useStory();

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500">Loading stories...</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          No stories found. Go&nbsp;{" "}
          <Link href="/new" className="underline">
            here
          </Link>{" "}
          &nbsp;to create a new story
        </div>
      ) : (
        <ul className="flex flex-wrap items-center justify-center">
          {stories.map((story) => (
            <StoryItem key={story.id} story={story} />
          ))}
        </ul>
      )}

      <Button asChild className="fixed bottom-12 right-12">
        <Link href="/new">
          <PlusSquareIcon size={24} /> Add a new story
        </Link>
      </Button>
    </div>
  );
};

export default StoryList;
