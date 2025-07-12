import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      {import.meta.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false}/>
      )}
    </QueryClientProvider>
    
  </StrictMode>,
)
