"use client";

import { Button, Input } from "@erecruitment/ui";
import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const JobSearch = () => {
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const router = useRouter();

  const onSearch = () => {
    if (title === "") {
      router.push(`/?search=${location}`);
    } else {
      router.push(`/?search=${title}${"&" + location}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-y-2 w-full md:w-4/5 lg:w-3/6 md:flex items-center justify-between border border-gray-200 shadow-lg rounded-2xl px-4 py-4 bg-white">
      <div className="flex items-center gap-4 w-full md:w-2/5 border-b border-gray-200 md:border-none ">
        <Search size={30} className="text-gray-400" />
        <Input
          className="border-none w-4/5"
          placeholder="Job title..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
        />
      </div>

      <div className="w-[2px] h-full bg-gray-300"></div>

      <div className="flex items-center gap-4 w-full md:w-2/5 border-b border-gray-200 md:border-none ">
        <MapPin size={30} className="text-gray-400" />
        <Input
          className="border-none w-4/5"
          placeholder="Location..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocation(e.currentTarget.value)
          }
        />
      </div>
      <Button onClick={onSearch} className="w-full md:w-fit">
        Find jobs
      </Button>
    </div>
  );
};
