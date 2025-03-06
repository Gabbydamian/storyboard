"use client";

import React from "react";
import Navbar from "./Navbar";
import StoryList from "./StoryList";
import { PrivateRoute } from "./PrivateRoute";

const HomeComponent = () => {
  return (
    <PrivateRoute>
      <div>
        {" "}
        <Navbar />
        <h1 className="text-center text-2xl md:text-4xl font-bold my-8 mb-4 md:my-16">
          Explore our Best Stories
        </h1>
        <StoryList />
      </div>
    </PrivateRoute>
  );
};

export default HomeComponent;
