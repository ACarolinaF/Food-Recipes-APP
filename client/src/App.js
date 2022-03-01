import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Landing from './components/Landing/Landing';

function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route exact path='/' element={<Landing/>}/>
    //   </Routes>
    // </BrowserRouter>
    
  );
}

export default App;
