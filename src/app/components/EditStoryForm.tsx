"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useStory } from "@/context/Storycontext";
import { Story } from "@/types/story";

interface EditStoryFormProps {
  story?: Story;
}

const EditStoryForm: React.FC<EditStoryFormProps> = ({ story }) => {
  const router = useRouter();
  const { updateStory } = useStory();

  const [storyDetails, setStoryDetails] = useState<Story | null>(null);

  useEffect(() => {
    if (story) {
      setStoryDetails({
        id: story.id,
        title: story.title,
        content: story.content,
        slug: story.slug,
        author_id: story.author_id,
        published_at: story.published_at,
        status: story.status,
        image_url: story.image_url,
        meta_description: story.meta_description,
        updated_at: format(new Date(), "yyyy-MM-dd") + "T23:59:59.999Z",
      });
    }
  }, [story]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (storyDetails) {
      setStoryDetails({ ...storyDetails, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!storyDetails) return;

    try {
      await updateStory(storyDetails);
      toast.success("Story Updated successfully");
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("Error updating story: ", error);
      toast.error("Error updating story");
    }
  };

  if (!storyDetails) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8">
      <ToastContainer />
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Title"
            required
            value={storyDetails.title}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="meta_description">Description</Label>
          <Input
            id="meta_description"
            type="text"
            placeholder="Description"
            required
            value={storyDetails.meta_description}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            type="text"
            placeholder="Image URL"
            required
            value={storyDetails.image_url}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            type="text"
            placeholder="Author"
            required
            value={storyDetails.author_id}
            disabled
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Content"
            required
            value={storyDetails.content}
            onChange={handleChange}
            rows={20}
          />
        </div>
        <div className="grid gap-2">
          <Button type="submit" className="w-full">
            Save Story
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditStoryForm;
