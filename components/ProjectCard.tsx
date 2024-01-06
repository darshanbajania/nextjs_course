"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type ProjectType = {
  id: string;
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  userId: string;
  customer: {
    name: string;
    profilePic: string;
  };
};
const ProjectCard = ({
  id,
  title,
  description,
  image,
  liveSiteUrl,
  githubUrl,
  category,
  userId,
  customer,
}: ProjectType) => {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
    );
  }, []);
  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          width={414}
          height={314}
          className="w-full h-full object-cover rounded-2xl"
          alt="project image"
        />
        <div className="hidden group-hover:flex profile_card-title">
          <p>{title}</p>
        </div>
      </Link>
      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm ">
        <Link href={`project/${userId}`}>
          <div className="flexCenter gap-2">
            {customer.profilePic && (
              <Image
                src={customer.profilePic}
                height={24}
                width={24}
                className="rounded-full"
                alt="profile"
              />
            )}
            <p>{customer.name}</p>
          </div>
        </Link>
        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src={"/hearth.svg"} width={13} height={12} alt="heart" />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src={"/eye.svg"} width={13} height={12} alt="eye" />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
