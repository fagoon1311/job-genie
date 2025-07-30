import { helloWorld } from "@/lib/inngest/function";
import { inngest } from "@/lib/inngest/inngest";
import { serve } from "inngest/next";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    helloWorld
  ],
});