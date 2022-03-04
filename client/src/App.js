import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';


//components:
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import CreateRecipe from './components/CreatRecipe/CreateRecipe.jsx';
import RecipeDetail from './components/RecipeDetail/RecipeDetail.jsx';
import About from './components/About/About.jsx';



export default function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/home' element={<Home/>}/> 
        <Route path='/createrecipe' element={<CreateRecipe />}/>
        <Route path='/recipe/:id'element={<RecipeDetail />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

