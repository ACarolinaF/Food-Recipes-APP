import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import CreateRecipe from './components/CreatRecipe/CreateRecipe.jsx';
import RecipeDetail from './components/RecipeDetail/RecipeDetail.jsx';
import About from './components/About/About.jsx';

function App() {
  return (
    // <div className="App">
    //   <h1>Henry Food</h1>
    // </div>
    <div>
      <h1>Henry Food</h1>
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/home' element={<Home/>}/> 
        <Route exact path='/createrecipe' element={<CreateRecipe/>}/>
        <Route exact path='/recipe/:id'element={<RecipeDetail/>}/>
        <Route exact path='/about' element={<About/>}/>
      </Routes>
    </div>

    
  );
}

export default App;
