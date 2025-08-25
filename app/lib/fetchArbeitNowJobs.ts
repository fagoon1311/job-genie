
interface ArbeitnowJob {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: string;
}

interface ArbeitnowApiResponse {
  data: ArbeitnowJob[];
  links: {
    next: string | null;
  };
}

// fetchArbNowJobs.t

export async function fetchArbNowJobs(): Promise<ArbeitnowJob[]> {
  const allJobs: ArbeitnowJob[] = [];
  let nextUrl: string | null = "https://arbeitnow.com/api/job-board-api";

  try {
    while (nextUrl) {
      const res: Response = await fetch(nextUrl, {
        headers: {
          "User-Agent": "job-genie-app",
        },
      });

      if (!res.ok) {
        throw new Error(`Arbeitnow API error: ${res.status} ${res.statusText}`);
      }

      const data: ArbeitnowApiResponse = await res.json();

      allJobs.push(...data.data);
      nextUrl = data.links?.next ?? null; // stop if no next page
    }

    return allJobs;
  } catch (error) {
    console.error("Error fetching Arbeitnow jobs:", error);
    throw new Error("Failed to fetch Arbeitnow jobs");
  }
}
