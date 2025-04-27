export default function getBaseUrl() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('API_BASE_URL is not defined in .env file');
  }
  return baseUrl;
}