
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />}>
            
          </Route>
          <Route path="/login" element={<Login />}>
            
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
