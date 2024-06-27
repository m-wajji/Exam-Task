import { z } from "zod";

export const loremSchema = z.object({
  name: z.string().min(10, {
    message: "Text must be at least 10 characters.",
  }),
});