import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

const HomePage = lazy(() => import("./pages/home"));
const LoginPage = lazy(() => import("./pages/login"));
const RegisterPage = lazy(() => import("./pages/register"));

function App() {
  return <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
    </BrowserRouter>
  </>;
}

export default App;
