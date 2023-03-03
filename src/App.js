import { useState } from 'react'

import Home from "./pages/Home";
import Categories from './pages/Categories'

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";


const App = () => {

  const [categoriesList, setCategoriesList] = useState (['Compras', 'Mochila'])


  return (
    <BrowserRouter>
    <Link to='/'>Home</Link>
    <Link to='/categories'>Categories</Link>
    <Routes>
      <Route path='/' element={<Home categoriesList={categoriesList} />} />
      <Route path='/categories' element={<Categories
        categoriesList={categoriesList}
        setCategoriesList={setCategoriesList}
        />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;