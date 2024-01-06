import { getClient } from "@/lib/client";
import { DELETE_PROJECT } from "@/lib/mutations";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { projectId } = await request.json();
    const client = getClient();
    const deleteProject = await client.mutate({
      mutation: DELETE_PROJECT,
      variables: {
        projectId: projectId,
      },
    });
    console.log(
      "🚀 ~ file: route.ts:15 ~ POST ~ deleteProject:",
      deleteProject
    );

    return NextResponse.json(deleteProject, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
