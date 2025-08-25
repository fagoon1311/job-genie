export async function fetchJoobleJobs(): Promise<any> {
  const apiKey = "8d18742c-d8df-43d8-8059-9c8ca9f397d3";

  try {
    const res = await fetch(`https://jooble.org/api/${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "job-genie-app",
      },
      body: JSON.stringify({
        keywords: "software developer",
        location: "remote",
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching Jooble jobs:", error);
    throw error;
  }
}
