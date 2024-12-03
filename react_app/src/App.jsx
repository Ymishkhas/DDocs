import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Header from './components/Header';
import FileExplorer from './components/FileExplorer';
import Document from './components/Content';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div id='main'>
          <ProtectedRoute>
            <FileExplorer />
          </ProtectedRoute>
          <div id='content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:file_id" element={<Document />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;