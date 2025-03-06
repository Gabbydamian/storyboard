import React, { useState } from "react";
import { Story } from "@/types/story";
import { format } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useStory } from "@/context/Storycontext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

interface StoryItemProps {
  story: Story | undefined;
}

const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  const { loading, deleteStory } = useStory();
  const router = useRouter();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    if (story) {
      await deleteStory(story.id);
      router.push("/");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {story ? (
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Title & Meta */}
          <h1 className="text-2xl md:text-3xl font-bold">{story.title}</h1>
          <p className="text-sm text-gray-600">{story.meta_description}</p>
          <h2 className="text-lg font-semibold">Posted by {story.author_id}</h2>
          <p className="text-xs text-gray-400">
            {story.published_at
              ? format(new Date(story.published_at), "MMMM dd, yyyy")
              : "Date not available"}
          </p>

          {user?.user_metadata.displayName === story.author_id && (
            <div className="flex flex-row items-start sm:items-center gap-3 ml-auto justify-end">
              <Button
                asChild
                size="sm"
                className="bg-gray-700 hover:bg-green-900 transition-all" 
              >
                <Link
                  href={`/edit/${story.id}`}
                  className="flex items-center gap-1"
                >
                  <Pencil size={20} />
                  Edit
                </Link>
              </Button>
              <Button
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="bg-red-700 hover:bg-red-900 transition-all"
              >
                <Trash size={20} />
                Delete
              </Button>
            </div>
          )}

          <div className="overflow-y-auto max-h-72 p-4 border rounded-lg bg-gray-50">
            <p className="leading-6 text-sm md:text-base">{story.content}</p>
          </div>
        </div>
      ) : loading ? (
        <div className="text-center py-10">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg font-semibold text-red-500">Story not found</p>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Are you sure you want to delete this story? This action cannot be
            undone.
          </p>
          <DialogFooter className="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 hover:bg-gray-700 w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-700 hover:bg-red-900 w-full sm:w-auto"
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoryItem;
