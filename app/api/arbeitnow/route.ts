import { NextResponse } from "next/server";
import { fetchArbNowJobs } from "@/app/lib/fetchArbeitNowJobs";

export async function GET() {
    try {
        const jobs = await fetchArbNowJobs();
        return NextResponse.json(jobs.slice(0, 20));
    } catch (error) {
        console.error("Error in Arbeitnow route:", error);
        return NextResponse.json(
            { error: "Failed to fetch jobs from Arbeitnow" },
            { status: 500 }
        );
    }
}
