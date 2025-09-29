import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OpenAPI } from './api/index.ts';
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,            // retry once on failure
      gcTime: 1000 * 60 * 5, // 5 minutes cache garbage collection
    },
  },
});

OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
OpenAPI.WITH_CREDENTIALS = true; // send cookies when CORS
OpenAPI.CREDENTIALS = 'include'; // include cookies in requests

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/*
        <ReactQueryDevtools initialIsOpen={false} />
      */}
    </QueryClientProvider>
  </StrictMode>,
)
