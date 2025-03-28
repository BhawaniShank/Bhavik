// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './Components/AdminPage';
import ContactCard from './Components/ContactCard';
import Navbar from './Components/Navbar';
import UserDetails from './Components/UserDetails';
import Dashboard from './Components/Dashboard';
import BoyChild from './Components/SoldCloths/BoyChild';
import Error from './Components/Error';
import GirlChild from './Components/SoldCloths/GirlChild';
import Men from './Components/SoldCloths/Men';
import Women from './Components/SoldCloths/Women';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navbar />} >
      <Route path="/" element={<Dashboard />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/contact" element={<ContactCard />} />
      <Route path="/user-details" element={<UserDetails />} />
      <Route path="/user-details/boychild" element={<BoyChild/>}/>
      <Route path="/user-details/girlchild" element={<GirlChild/>}/>
      <Route path="/user-details/Men" element={<Men/>}/>
      <Route path="/user-details/boychild" element={<Women/>}/>



      <Route path='*' element={<Error/>}/>
      </Route>
    </Routes>
  </Router>
);

export default App;
