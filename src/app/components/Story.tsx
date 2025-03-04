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
    <Link
      href={`/stories/${story.slug}`}
      className="p-4 bg-[#78484839] rounded-md shadow-md"
    >
      <li key={story.id} className=" flex gap-3 p-2">
        <Image
          src={"https://picsum.photos/seed/50/250.webp"}
          width={250}
          height={250}
          alt={story.slug}
          className="self-center rounded-md w-1/6"
        />
        <div className="flex flex-col justify-between w-5/6">
          <h2 className="text-xl font-bold">{story.title}</h2>
          <p>
            {`${story.content} Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Natus laborum pariatur fugiat iure repellendus
                vel officiis similique et at quibusdam quidem in voluptatibus
                mollitia corporis assumenda veniam, eaque aliquam necessitatibus
                excepturi reiciendis? Nostrum officia natus architecto! Velit
                laborum magnam ratione? Quisquam, quos. Quisquam, quos. Quisquam,
                quos. Quisquam, quos. Quisquam, quos. Quisquam, quos. Quisquam,
                quos. Quisquam, quos. Quisquam, quos. Quisquam, quos. Quisquam,`
              .trim()
              .slice(0, 700) + "..."}
          </p>
          <span className="text-xs mt-3">
            Published on:{" "}
            {story.published_at
              ? format(new Date(story.published_at), "MMMM dd, yyyy")
              : "N/A"}
          </span>
        </div>
      </li>
    </Link>
  );
};

export default StoryItem;
