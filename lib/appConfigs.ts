import fs from "fs";
import path from "path";
import axios, { AxiosError } from "axios";

export async function fetchAppConfig(config: any) {
  const filePath = path.join(process.cwd(), "metadata/app/service-definitions.json");
  const fallbackUrl = config.url + '/services/servicedefs';
  try {
    // Check if file exists asynchronously
    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(jsonData);
    } else {
      console.warn("Local JSON file not found, fetching from API...");
      
      // Fetch from the API if local file is missing
      try {
        const response = await axios.get(fallbackUrl);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 503) {
          console.warn("API service unavailable (503). Returning empty config.");
        }
        console.error("Error fetching from API:", error);
        return { serviceDefs: {}, securityDefinitions: {} }; // Fallback empty object
      }
    }
  } catch (error) {
    // Log the error and return an empty config as a fallback
    console.error("Error fetching service definitions:", error);
    return { serviceDefs: {}, securityDefinitions: {} }; // Fallback empty object
  }
}