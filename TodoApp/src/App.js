import Home from './Home.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">

      <Routes>

        <Route path="/" element={<Home />} />

      </Routes>
      </div>
    </Router>
  );
}

export default App;