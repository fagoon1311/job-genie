export async function fetchDevToJobs(): Promise<void> {
    try {
        const res = await fetch('https://dev.to/api/articles?tag=jobs', {
            headers:{
                accept: 'application/json',
            }
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching Dev.to jobs:", error);
    }
}

