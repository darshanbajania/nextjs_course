"use client";

import { DELETE_PROJECT } from "@/lib/mutations";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Image from "next/image";
import Link from "next/link";
import { permanentRedirect, redirect } from "next/navigation";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ProjectActions = ({ projectId }: { projectId: string }) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const isProduction = process.env.NODE_ENV === "production";
  const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:3000";

  const handleDeleteProject = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`${serverUrl}/api/deleteProject`, {
        method: "POST",
        body: JSON.stringify({ projectId: projectId }),
      });
      response
        .json()
        .then((data) => {
          const isDeleted = data?.data?.delete_users_project_by_pk?.id;
          if (isDeleted) {
            router.push("/");
          }
        })
        .finally(() => setIsDeleting(false));

      return;
      // return response.json();
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src={"/pencile.svg"} width={15} height={15} alt="edit" />
      </Link>
      <button
        onClick={() => {
          handleDeleteProject();
        }}
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
        type="button"
      >
        <Image src={"/trash.svg"} width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default ProjectActions;
