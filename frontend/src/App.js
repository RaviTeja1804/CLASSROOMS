import './App.css';
import Homepage from './Pages/Homepage';
import LoginSignup from './Pages/LoginSignup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomepageAdmin from './Pages/HomepageAdmin'
import Feedback from './Pages/Feedback'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginSignup />} />
          <Route path='/inside' element={<Homepage />} />
          <Route path='/insideAdmin' element={<HomepageAdmin />} />
          <Route path='/feedback' element={<Feedback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
