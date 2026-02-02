
const IS_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const apiUrl = import.meta.env.VITE_API_URL || "https://api.miapp.com";

export { IS_MOCK, apiUrl };