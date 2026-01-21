"use client";

import { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { z } from "zod";
import { formSchema } from "@/lib/validation";
import { toast } from "sonner";
import { createPitch } from "@/lib/actions/createPitch";
import { useRouter } from "next/navigation";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import Image from "next/image";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const router = useRouter();

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]); // single file only
    }
  };

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const category = formData.get("category") as string;

      const formValues = { title, description, category, image: file, pitch };
      await formSchema.parseAsync(formValues);

      // Pass the file to createPitch for uploading
      const result = await createPitch(prevState, formData, pitch, file);

      if (result.status === "SUCCESS") {
        toast.success("Your startup pitch has been created successfully", {
          description: "Thank you for sharing your idea with the community!",
        });
        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Invalid input", { description: "Please try again" });
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("Unknown error occurred", {
        description: "Please try again",
      });
      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {errors.title && (
          <p className="startup-form_error">{errors.title[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="image" className="startup-form_label">
          Image
        </label>
        <Dropzone
          accept={{ "image/*": [] }}
          onDrop={handleDrop}
          onError={console.error}
          src={file ? [file] : undefined}
          multiple={false}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
        {file && (
          <div className="self-center pt-5!">
            <p className="text-center font-bold">Previwe</p>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="h-40 w-40 mt-2 object-cover self-center m-4!"
            />
          </div>
        )}
        {errors.image && <p className="startup-form_error">{errors.image}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value || "")}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{ placeholder: "Briefly describe your idea..." }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
