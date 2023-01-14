import { useState } from 'react'

import Home from "./pages/Home";
import Categories from './pages/Categories'


const App = () => {

  const [currentPage, setCurrentPage] = useState ('home')

  const [categoriesList, setCategoriesList] = useState (['Compras', 'Mochila'])

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  if (currentPage === 'categories') {
    return (
      <>
        <button onClick={() => goToPage('home')}>Home</button>
        {' '}
        <button onClick={() => goToPage('categories')}>Categories</button>
        <br/>
        <br/>
        <br/>
        <Categories
          categoriesList={categoriesList}
          setCategoriesList={setCategoriesList}
        />
        
      </>
    )
  }

  return (
    <>
      <button onClick={() => goToPage('home')}>Home</button>
      {' '}
      <button onClick={() => goToPage('categories')}>Categories</button>
      <br/>
      <br/>
      <br/>
      <Home
        categoriesList={categoriesList}

      />
    </>
  )
}

export default App;