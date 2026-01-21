"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const ResetSearchForm = () => {
  const router = useRouter();
  return (
    <button
      type="reset"
      className="search-btn text-amber-50!"
      onClick={() => router.replace("/")}
    >
      <X />
    </button>
  );
};

export default ResetSearchForm;
