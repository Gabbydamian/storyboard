import React from "react";
import { Story } from "@/types/story";
import { format } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useStory } from "@/context/Storycontext";
import { useRouter } from "next/navigation";

interface StoryItemProps {
  story: Story | undefined;
}

const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  const { loading, deleteStory } = useStory();
  const router = useRouter();

  const handleDelete = async () => {
    if (story) {
      await deleteStory(story.id);
      router.push("/");
    }
  };

  return (
    <div>
      {story ? (
        <div className="container mx-auto p-4 mt-10">
          <div className="grid gap-3">
            <h1 className="text-3xl font-bold">{story.title}</h1>
            <h2 className="text-xl font-semibold">
              Posted by {story.author_id}
            </h2>
            <p className="text-sm text-gray-400">
              {story.published_at
                ? format(new Date(story.published_at), "MMMM dd, yyyy")
                : "Date not available"}
            </p>
            <div className="flex items-center self-end ml-auto gap-4">
              <Button
                asChild
                size={"sm"}
                className=" bg-gray-700 cursor-pointer hover:bg-green-900 transition-all duration-300 ease-in-out"
              >
                <Link
                  href={`/edit/${story.id}`}
                  className="flex items-center gap-1"
                >
                  <Pencil size={24} />
                  Edit Story
                </Link>
              </Button>
              <Button
                size={"sm"}
                onClick={handleDelete}
                className="bg-red-700 cursor-pointer hover:bg-red-900 transition-all duration-300 ease-in-out"
              >
                <Trash size={24} />
                Delete Story
              </Button>
            </div>
            <p className="text-balance leading-6 mt-4 overflow-y-scroll max-h-64 outline p-4 rounded-xl">
              {story.content}
            </p>
          </div>
        </div>
      ) : loading ? (
        <div className="container mx-auto p-4 mt-10">
          <p>Loading...</p>
        </div>
      ) : (
        <div>Story not found</div>
      )}
    </div>
  );
};

export default StoryItem;
