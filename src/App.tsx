import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthProvider } from './contexts/auth.context';

const HomePage = lazy(() => import("./pages/home"));
const LoginPage = lazy(() => import("./pages/login"));
const RegisterPage = lazy(() => import("./pages/register"));
const ChatPage = lazy(() => import("./pages/chat"));
const DiscoverPage = lazy(() => import("./pages/discover"));

function App() {
  return <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/chat/:groupId' element={<ChatPage />} />
          <Route path='/discover' element={<DiscoverPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>;
}

export default App;
