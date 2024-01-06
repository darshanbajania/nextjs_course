import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getClient } from "@/lib/client";
import { GET_PROJECT_DATA } from "@/lib/queries";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  if (!session?.user) redirect("/");
  const client = getClient();
  const { data } = await client.query({
    query: GET_PROJECT_DATA,
    variables: {
      userId: session?.user?.id,
      projectId: id,
    },
  });
  console.log("🚀 ~ file: page.tsx:20 ~ EditProject ~ data:", data);

  return (
    <Modal>
      <h3 className="modal-head-text"> Edit Project</h3>
      <ProjectForm
        type="edit"
        session={session}
        project={data?.users_project[0]}
      />
    </Modal>
  );
};

export default EditProject;
