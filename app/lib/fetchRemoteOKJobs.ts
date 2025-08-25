export async function fetchRemoteOKJobs() {
    const res = await fetch('https://remoteok.com/api', {
        headers: {
            'User-Agent': 'job-genie-app',
        }
    })
    const jobs = await res.json();
    return jobs
}