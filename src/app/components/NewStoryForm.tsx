"use client";

import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useStory } from "@/context/Storycontext";

const NewStoryForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { addStory } = useStory();
  const initialState = {
    id: uuidv4(),
    title: "",
    content: "",
    slug: "",
    author_id: user?.user_metadata?.displayName || "Unknown Author",
    published_at: format(new Date(), "yyyy-MM-dd") + "T23:59:59.999Z",
    status: "draft",
    image_url: "",
    meta_description: "",
    updated_at: format(new Date(), "yyyy-MM-dd") + "T23:59:59.999Z",
  };

  const [story, setStory] = useState(initialState);

  const { title, content, author_id, meta_description } = story;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addStory(story);
      toast("Story added successfully");
      setStory(initialState);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("Error adding new story: ", error);
      toast("Error adding new story");
    }
  };

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
            value={title}
            onChange={(e) => setStory({ ...story, title: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="title">Description</Label>
          <Input
            id="description"
            type="text"
            placeholder="Description"
            required
            value={meta_description}
            onChange={(e) =>
              setStory({ ...story, meta_description: e.target.value })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            type="text"
            placeholder="Image URL"
            required
            value={story.image_url || "https://picsum.photos/200/300"}
            onChange={(e) => setStory({ ...story, image_url: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="title">Author</Label>
          <Input
            id="author"
            type="text"
            placeholder="Author"
            required
            value={author_id}
            disabled
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Content"
            required
            value={content}
            onChange={(e) => setStory({ ...story, content: e.target.value })}
            rows={20}
          />
        </div>
        <div className="grid gap-2">
          <Button type="submit" className="w-full">
            Add Story
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewStoryForm;
