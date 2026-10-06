import urls from "./urls.js";

// This function is used for all interactions with the API
export async function contactAPI(path, options) {
  try {
    // Contact the API through the path and get the response
    const url = `${urls.backend}${path}`;
    const response = await fetch(url, options);

    // If we just deleted something, return
    if (response.status === 204) {
      return null;
    }

    // Get the json from the response
    const result = await response.json();

    // If there was an error, show the message and throw the error
    if (!response.ok) {
      const error = new Error(result.message || "Request failed.");
      error.status = response.status;
      throw error;
    }

    // Return the result
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
