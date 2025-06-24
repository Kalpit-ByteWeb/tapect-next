export const getUserCountry = async (): Promise<string> => {
  try {
    const response = await fetch("https://ipinfo.io/json?token=e2639d93002eeb"); // Replace with your token
    const data = await response.json();
    return data.country || "US"; 
  } catch (error) {
    console.error("Error fetching user location:", error);
    return "US"; 
  }
};