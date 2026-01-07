"server-only";
import { formSchema } from "@/lib/validation";
import z from "zod";

export async function action(prevState: any, formAction: FormData, setError) {
  try {
    const formValues = {
      title: formAction.get("title"),
      describtion: formAction.get("describtion"),
      link: formAction.get("image-link"),
      pitch: formAction.get("pitch"),
    };
    await formSchema.parseAsync(formValues);
    // const result=await createIdea
    console.log("finised");
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldError = error.flatten().fieldErrors;
      setError(fieldError as unknown as Record<string, string>);
      return { ...prevState, error: "validation Error", status: "Error" };
    }
    return { ...prevState, error: "un Expected Error", status: "Error" };
  }
}
