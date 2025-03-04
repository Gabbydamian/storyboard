import React from "react";
import { Story } from "@/types/story";
import StoryItem from "@/app/components/Story";
interface StoryListProps {
  stories: Story[];
}

const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  return (
    <div className="container mx-auto p-4 pt-40">
      <ul className="flex flex-col space-y-4">
        {stories.map((story) => (
          <StoryItem key={story.id} story
          ={story}/>
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
