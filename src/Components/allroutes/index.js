import React from 'react'
import {Routes,Route} from "react-router-dom"
import SingleMovieDetails from '../../pages/SingleMovieDetails'
import MovieEdit from '../../pages/movieedit'
import AddMovie from '../../pages/addmovie'
import Login from '../../pages/login'
import Persons from '../../pages/persons'
import MovieListing from '../../pages/movies'
import Home from '../../pages/homepage'


const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movies' element={<MovieListing/>}/>
      <Route path='/movie_edit/:id' element={<MovieEdit/>}/>
      <Route path='/addmovie' element={<AddMovie/>}/>
      <Route path='/person' element={<Persons/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/detailsmovie/:id' element={<SingleMovieDetails/>}/>
    </Routes>
  )
}

export default AllRoutes
