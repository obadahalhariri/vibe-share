import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContextProvider from './contexts/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MoodPage from './pages/MoodPage';


function App() {
  return (
    <Router>
      <AppContextProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/moods" element={<MoodPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Route>
        </Routes>
      </AppContextProvider>
    </Router>
  );
}

export default App;
