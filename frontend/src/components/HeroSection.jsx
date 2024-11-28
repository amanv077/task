import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative bg-white py-8 sm:py-12">
      <div className="container mx-auto text-center px-4 sm:px-6">
        {/* Title and Description */}
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-6 select-none">
          Empower Your Team <br />
          With <span className="text-[#004aad]">Seamless Collaboration</span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto text-gray-600 select-none">
          Simplify team communication, streamline workflows, and boost
          productivity with our all-in-one team management platform. Perfect for
          remote, hybrid, and in-office teams.
        </p>

        {/* Features Section */}
        <div className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-6 select-none">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Task Assignment",
                desc: "Assign tasks effortlessly to the right team members.",
              },
              {
                title: "Real-Time Chat",
                desc: "Stay connected with instant messaging and group chats.",
              },
              {
                title: "Progress Tracking",
                desc: "Monitor project milestones and individual performance.",
              },
              {
                title: "File Sharing",
                desc: "Securely share and store project files in one place.",
              },
              {
                title: "Team Calendars",
                desc: "Plan and schedule team events with shared calendars.",
              },
              {
                title: "Analytics",
                desc: "Gain insights into team productivity and project status.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-md p-6 text-left"
              >
                <h3 className="text-[#004aad] text-lg font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
