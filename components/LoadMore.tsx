"use client";
import Button from "./Button";

import { useRouter } from "next/navigation";
type LoadMoreProps = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
const LoadMore = ({ hasPreviousPage, hasNextPage }: LoadMoreProps) => {
  const router = useRouter();
  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (direction === "first" && hasPreviousPage) {
      currentParams.delete("offset");
      currentParams.set("offset", "0");
    } else if (direction === "next" && hasNextPage) {
      currentParams.delete("offset");
      currentParams.set(
        "offset",
        String(Number(currentParams.get("offset")) + 8)
      );
    }
    currentParams.toString();

    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };
  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          title="First Page"
          handleClick={() => handleNavigation("first")}
        />
      )}
      {hasNextPage && (
        <Button
          title="Next Page"
          handleClick={() => handleNavigation("next")}
        />
      )}
    </div>
  );
};

export default LoadMore;
