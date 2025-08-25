import { fetchJoobleJobs } from "@/app/lib/jooble";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const jobs = await fetchJoobleJobs();
        return NextResponse.json(jobs);
    } catch (error) {
        console.error("Error in Arbeitnow route:", error);
        return NextResponse.json(
            { error: "Failed to fetch jobs from Jooble" },
            { status: 500 }
        );
    }
}