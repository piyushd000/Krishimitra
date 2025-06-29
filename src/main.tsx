import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './pages/UserContext'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="691182636344-stgmho1mfkrhpkulg4652vv8g44242ri.apps.googleusercontent.com">
      <UserProvider> 
        <App /> {/*  Your full app goes here */}
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);

