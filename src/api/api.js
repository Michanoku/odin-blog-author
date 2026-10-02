import urls from "./urls.js";

export async function contactAPI(path, options) {
  try {
    const url = `${urls.backend}${path}`;
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const result = await response.json();

    if (!response.ok) {
      const error = new Error(result.message || "Request failed.");
      error.status = response.status;
      throw error;
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
