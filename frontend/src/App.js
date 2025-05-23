import './App.css';
import Movies from './pages/Movies.jsx';
import Seats from './pages/Seats.jsx';
import ReservationEdit from './pages/ReservationEdit.jsx';
import UserInfo from './pages/UserInfo.jsx';
import Confirmation from './pages/Confirmation.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Movies />} />
            <Route path='/seats' element={<Seats />} />
            <Route path='/reservation-edit' element={<ReservationEdit />} ></Route>
            <Route path='/user-information' element={<UserInfo />} />
            <Route path='/confirmation' element={<Confirmation />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;