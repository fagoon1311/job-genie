export async function fetchRapidJobs(): Promise<void> {
  const url =
    "https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=5&date_posted=all";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f81e6c47abmsh2525d7e2a29249cp1eebaejsnb2738127b1ef",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
