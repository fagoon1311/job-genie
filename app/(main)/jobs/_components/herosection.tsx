import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BriefcaseBusiness,
  Building,
  NotepadText,
  Search,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full pt-5 md:pt-10 lg:pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Heading and description text */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold gradient-title animate-gradient">
          Find Your Dream Job Today!
        </h1>
        <p className="mx-auto max-w-[600px] text-xs sm:text-sm md:text-base text-muted-foreground">
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </p>
      </div>

      {/* Filters for searching */}
      <section className="w-full px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl shadow-md p-2 sm:p-4">
            {/* Input */}
            <Input
              type="text"
              placeholder="Job Title or Company"
              className="flex-1 px-4 py-2 text-sm  outline-none placeholder:text-gray-400 bg-[#1c1c1c] text-white border border-transparent focus:border-white focus:ring-0"
            />

            {/* Divider for large screens */}
            <div className="hidden sm:block w-px h-8 bg-gray-600" />

            {/* Select Location */}
            <Select>
              <SelectTrigger className="w-full sm:w-[160px] bg-[#1c1c1c] text-white border border-transparent focus:border-white focus:ring-0  px-4 py-2 placeholder:text-gray-400">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent className="bg-[#1c1c1c] text-white border border-gray-700">
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-gray-600" />

            {/* Select Category */}
            <Select>
              <SelectTrigger className="w-full sm:w-[160px] bg-[#1c1c1c] text-white border border-transparent focus:border-white focus:ring-0  px-4 py-2 placeholder:text-gray-400">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#1c1c1c] text-white border border-gray-700">
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>

            {/* Search Button */}
            <Button
              variant="blue"
              className="w-full sm:w-auto flex gap-2 items-center px-6 py-2 mt-2 sm:mt-0 "
            >
              <Search className="w-4 h-4" />
              Search Job
            </Button>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="w-full py-4 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: (
                  <BriefcaseBusiness className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
                ),
                number: "25,800",
                label: "Jobs",
              },
              {
                icon: (
                  <UsersRound className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
                ),
                number: "1000+",
                label: "Users",
              },
              {
                icon: (
                  <Building className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
                ),
                number: "1800+",
                label: "Companies",
              },
              {
                icon: (
                  <NotepadText className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
                ),
                number: "1000+",
                label: "Applications",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center space-x-4 text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-transparent md:bg-primary/10">
                  {item.icon}
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h3 className="font-semibold text-base sm:text-lg md:text-xl">
                    {item.number}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* company logos */}
      <div className="w-full bg-[#00a6bc]/20 rounded-lg mt-6 sm:mt-8 lg:mt-10">
        <div className="max-w-6xl mx-auto flex justify-evenly items-center gap-4 px-4 py-6 flex-wrap">
          {[
            "yt.png",
            "apple.png",
            "slack.png",
            "microsoft.png",
            "ados.png",
          ].map((logo, index) => (
            <div
              key={index}
              className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 flex items-center justify-center"
            >
              <Image
                src={`/${logo}`}
                alt={`Company Logo ${index + 1}`}
                width={96}
                height={96}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
