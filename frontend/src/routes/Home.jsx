import React from "react";
import WebcamCapture from "../utilities/WebcamCapture";
import { GrAnnounce } from "react-icons/gr";
import { MdAssignmentAdd } from "react-icons/md";
import { Button } from "../components/MovingBorder";
// import { div } from "motion/react-client";
import Announcements from "../components/Announcements";

function Home() {
  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center justify-center w-full min-h-[100vh] p-10 bg-gray-800 text-white font-roboto">
        <h1 className="text-center font-bold text-2xl mb-10">
          Ask Ignite AIVA
        </h1>
        <WebcamCapture />

        <h2 class="mt-5 text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
          Welcome User
        </h2>
        <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent mb-5">
          How can I help you today?
        </h2>

        <div className="flex flex-row gap-4">
          <div
            class="px-8 py-4 mb-4 text-sm rounded-lg bg-gray-700 text-green-400 flex gap-2 items-center"
            role="alert"
          >
            <span class="font-medium">
              <GrAnnounce />{" "}
            </span>{" "}
            See important! Announcements
          </div>
          <div
            class="px-8 py-4 mb-4 text-sm rounded-lg bg-gray-700 bg-opacity-20 text-yellow-400 flex gap-2 items-center"
            role="alert"
          >
            <span class="font-medium">
              <MdAssignmentAdd />
            </span>{" "}
            Know this week's Assignments
          </div>
        </div>

        <Button
          duration={Math.floor(Math.random() * 2000) + 2000}
          borderRadius="1.75rem"
          className="flex-1 text-white border-neutral-200 dark:border-slate-800"
        >
          <input
            type="text"
            className="bg-white/70 text-gray-700 text-sm py-3 w-[90%] px-6 rounded-2xl border-none outline-none"
            placeholder="Any Announcements"
          />
        </Button>
      </div>
      <Announcements />
    </div>
  );
}

export default Home;
