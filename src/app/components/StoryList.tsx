import React from "react";
import Image from "next/image";
import { Story } from "@/types/story";
interface StoryListProps {
  stories: Story[];
}

const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  return (
    <div className="container mx-auto p-4">
      <ul className="flex flex-col space-y-4">
        {stories.map((story) => (
          <li key={story.id} className=" flex gap-2 p-2">
            <Image
              src={"https://picsum.photos/seed/50/150.webp"}
              width={150}
              height={50}
              alt={story.slug}
            />
            <div className="flex-flex-col">
              <h2 className="text-xl font-bold">{story.title}</h2>
              <p>{story.content}</p>
              <span>Published at: {(story.published_at)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
