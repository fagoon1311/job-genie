import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: "job-genie",
    name: 'Job-genie',
    credentials: {
        gemini: {
            apiKey: process.env.GEMINI_API_KEY
        }
    }
})