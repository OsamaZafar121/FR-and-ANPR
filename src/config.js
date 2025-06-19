const configs = {
  appTitle: import.meta.env.VITE_APP_NAME || 'Name',
  appEnvironment: import.meta.env.VITE_APP_ENVIRONMENT,
  apiUrl: import.meta.env.VITE_API_URL,
  publicURL: import.meta.env.VITE_PUBLIC_URL,
};

export default configs;
