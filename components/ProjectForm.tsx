"use client";
import React, { ChangeEvent, useState } from "react";
import { ProjectInterface, SessionInterface } from "@/common.types";
import Image from "next/image";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { CREATE_NEW_PROJECT, UPDATE_PROJECT } from "@/lib/mutations";
import { useMutation } from "@apollo/client";
type ProjectFromProps = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};
const isProduction = process.env.NODE_ENV === "production";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const ProjectForm = ({ type, session, project }: ProjectFromProps) => {
  const router = useRouter();
  const [createNewUser] = useMutation(CREATE_NEW_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const uploadImage = async (imagePath: string) => {
    try {
      const response = await fetch(`${serverUrl}/api/upload`, {
        method: "POST",
        body: JSON.stringify({ path: imagePath }),
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  };
  const isBase64Url = (str: string) => {
    const base64UrlRegex = /^data:[a-z]+\/[a-z]+;base64,([A-Za-z0-9-_+/=])+$/;
    return base64UrlRegex.test(str);
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (type === "create") {
        const image = await uploadImage(form.image);
        const projectData = {
          ...form,
          image: image?.url,
          createdBy: session?.user?.id,
        };
        createNewUser({
          variables: {
            projectData: projectData,
          },
          onCompleted: (data) => {
            setIsSubmitting(false);
          },
          onError: (error) => {
            console.log(
              "🚀 ~ file: ProjectForm.tsx:55 ~ handleFormSubmit ~ error:",
              error
            );
          },
        });
        setIsSubmitting(false);
        router.push("/");
      }
      if (type === "edit") {
        let updatedForm = { ...form };
        const isUploadingNewImage = isBase64Url(form.image);
        if (isUploadingNewImage) {
          const image = await uploadImage(form.image);

          updatedForm = {
            ...form,
            image: image?.url,
          };
        }
        updateProject({
          variables: {
            projectId: project?.id,
            setProject: updatedForm,
          },
        });
        setIsSubmitting(false);
        router.push("/");
      }
      return;
    } catch (error) {
      console.log(
        "🚀 ~ file: ProjectForm.tsx:41 ~ handleFormSubmit ~ error:",
        error
      );
      setIsSubmitting(false);
    }
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image file");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };
  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: project?.title || "",
    description: project?.description || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
    image: project?.image || "",
  });
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="post" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          className="form_image-input"
          onChange={handleChangeImage}
        />

        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="project poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder={"Flexible"}
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder={"Showcase remarkable developer projects"}
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder={"https://"}
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder={"https://"}
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
