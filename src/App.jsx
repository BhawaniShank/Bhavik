// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './Components/AdminPage';
import ContactCard from './Components/ContactCard';
import Navbar from './Components/Navbar';
import UserDetails from './Components/UserDetails';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navbar />} >
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/contact" element={<ContactCard />} />
      <Route path="/user-details" element={<UserDetails />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
