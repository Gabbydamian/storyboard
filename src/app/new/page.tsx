import React from "react";
import Navbar from "../components/Navbar";
import NewStoryForm from "../components/NewStoryForm";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-center font-bold text-2xl mt-4">Add a New Story</h1>
        <NewStoryForm />
      </div>
    </div>
  );
};

export default page;
