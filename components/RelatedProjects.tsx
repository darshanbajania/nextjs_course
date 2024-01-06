import { getClient } from "@/lib/client";
import { GET_PROJECTS, GET_PROJECTS_BY_USER } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type RelatedProjectProps = {
  userId: string;
  projectId: string;
  name: string;
};
const RelatedProjects = async ({
  userId,
  projectId,
  name,
}: RelatedProjectProps) => {
  const client = getClient();
  const { data } = await client.query({
    query: GET_PROJECTS_BY_USER,
    variables: {
      userId,
      projectId,
    },
  });
  console.log(
    "🚀 ~ file: RelatedProjects.tsx:17 ~ RelatedProjects ~ data:",
    data
  );
  if (data.users_project.length === 0) {
    return <div>No related projects</div>;
  }
  return (
    <section className="flex flex-col  mt-32 w-full">
      <div className="flexBetween">
        <p> More By {name} </p>
        <Link
          href={`/profile/${userId}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>
      <div className="related_projects-grid">
        {data.users_project.map((project) => (
          <div
            key={project?.id}
            className="flexCenter related_project-card drop-shadow-card"
          >
            <Link
              href={`/project/${project.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={project?.image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="project image"
              />
              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{project?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
