import ProfilePage from "@/components/ProfilePage";
import { getClient } from "@/lib/client";
import {
  GET_PROJECTS,
  GET_PROJECTS_BY_USER,
  GET_USER_PROFILE_DETAILS,
} from "@/lib/queries";
import { getCurrentUser } from "@/lib/session";
import { useQuery } from "@apollo/client";
import React from "react";

type UserProfileProps = {
  params: {
    id: string;
  };
};
const UserProfile = async ({ params }: UserProfileProps) => {
  console.log("🚀 ~ file: page.tsx:18 ~ UserProfile ~ params:", params);

  const client = getClient();
  const { data } = await client.query({
    query: GET_USER_PROFILE_DETAILS,
    variables: {
      userId: params.id,
    },
  });
  if (data.users_customer) {
    <p>No user found</p>;
  }
  console.log(
    "🚀 ~ file: page.tsx:28 ~ UserProfile ~ users_customer:",
    data.users_customer[0]
  );
  return <ProfilePage user={data.users_customer?.[0]} />;
};

export default UserProfile;
