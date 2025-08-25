import { inngest } from "@/lib/inngest/inngest";
import { db } from "../prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generateIndustryInsights = inngest.createFunction(
  { id: "insight-generation" },
  { cron: "0 0 1 * *" },
  async ({ step }) => {
    const industries = await step.run("Fetch Industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

      const res = await step.ai.wrap(
        "gemini",
        async (p) => {
          return (await model.generateContent(prompt)).response.text();
        },
        prompt
      );

      const cleanedText = res.replace(/```(?:json)?\n?/g, "").trim()

      const insights = JSON.parse(cleanedText)

      await step.run(`Update ${industry} insights`, async()=>{
        await db.industryInsight.update({
          where: {industry},
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
          }

        })
      })

    }
  }
);
