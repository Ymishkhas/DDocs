import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Header from './components/Header';
import FileExplorer from './components/FileExplorer';
import Content from './components/Content';
import './App.css';

function Main() {
  const location = useLocation();
  const mainContainerRef = useRef(null);

  useEffect(() => {
    const mainContainer = mainContainerRef.current;
    if (mainContainer) {
      const childCount = mainContainer.childElementCount;
      if (childCount === 1) {
        mainContainer.classList.add('single-item');
        mainContainer.classList.remove('two-items');
      } else if (childCount === 2) {
        mainContainer.classList.add('two-items');
        mainContainer.classList.remove('single-item');
      }
    }
  }, [location]);

  return (
    <div id='main' ref={mainContainerRef}>
      <ProtectedRoute>
          <FileExplorer />
      </ProtectedRoute>
      <div id='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:file_id" element={<Content />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Main />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;