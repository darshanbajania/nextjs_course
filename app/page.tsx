// "use client";

// export const dynamic = "force-dynamic";

// import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql, useQuery } from "@apollo/client";
import { getCurrentUser } from "@/lib/session";
import { GET_PROJECTS } from "@/lib/queries";
import { getClient } from "@/lib/client";
import ProjectCard from "@/components/ProjectCard";
import Categories from "@/components/Categories";
// const GET_POSTS = gql`
//   query GET_POSTS($userId: uuid) {
//     users_project(where: { createdBy: { _eq: $userId } }) {
//       id
//       title
//       description
//     }
//   }
// `;
type ProjectType = {
  id: string;
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  customer: {
    name: string;
    profilePic: string;
  };
};

type searchParamsProps = {
  searchParams: {
    category?: string;
  };
};
const Home = async ({ searchParams: { category } }: searchParamsProps) => {
  console.log("🚀 ~ file: page.tsx:41 ~ Home ~ category:", category);
  const session = await getCurrentUser();
  const client = getClient();
  const { data } = await client.query({
    query: GET_PROJECTS,
    variables: {
      where: {
        createdBy: { _eq: session?.user?.id },
        ...(category ? { category: { _eq: category } } : {}),
      },
    },
  });
  const projectsData = data?.users_project as ProjectType[];
  console.log("🚀 ~ file: page.tsx:29 ~ Home ~ data:", data);
  if (projectsData.length === 0) {
    return (
      <section className="flexStart  flex-col paddings">
        Categories
        <p className="no-result-text text-center">
          No projects found, go create some
        </p>
      </section>
    );
  }
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {projectsData.map((project) => {
          return <ProjectCard key={project.id} {...project} />;
        })}
      </section>
      <h1>Load more</h1>
    </section>
  );
};

export default Home;
