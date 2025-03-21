import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Story } from "@/types/story";
import { format } from "date-fns";

interface StoryItemProps {
  story: Story;
}

const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  return (
    <li key={story.id} className=" flex flex-col p-2 items-center">
      <Link
        href={`/${story.id}`}
        className="p-4 outline-1 border-[#e6e6e6] rounded-md  w-52 h-76 hover:scale-[1.02] hover:bg-accent transition-all duration-300 ease-in-out hover:shadow-md flex flex-col justify-between"
      >
        <Image
          src={story.image_url || "https://picsum.photos/seed/200/200.webp"}
          width={200}
          height={200}
          alt={story.title}
          loading="lazy"
          className="rounded-md grow "
        />
        <div className="flex flex-col justify-between text-center mt-3">
          <h2 className="text-md font-bold text-center">{story.title}</h2>
          <p className="text-balance text-xs text-center">
            {`${story.meta_description}`.trim().slice(0, 35) + ".."}
          </p>
          <span className="text-xs mt-3">
            Published on:{" "}
            {story.published_at
              ? format(new Date(story.published_at), "MMMM dd, yyyy")
              : "N/A"}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default StoryItem;
