import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { useAuth } from './store/store.js';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

// اول کاربر لود بشه قبل بالا اومدن اپ
const initialize = async () => {
  await useAuth.getState().initAuth(); 
};

initialize().then(()=>{
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
});