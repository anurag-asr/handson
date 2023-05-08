import React from 'react'
import {Routes,Route} from "react-router-dom"
import Movies from '../../Pages/Movies'
import Persons from '../../Pages/Persons'
import Home from '../../Pages/Home'
import SingleMovieDetails from '../../Pages/SingleMovieDetails'
import Login from '../../Pages/Login'
import EditPage from '../../Pages/EditPage'
// import AddPerson from '../../Pages/addperson'
import MovieEdit from '../../Pages/movieedit'
import AddMovie from '../../Pages/addmovie'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/addmovie' element={<AddMovie/>}/>
      <Route path='/person' element={<Persons/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/edit' element={<EditPage/>}/>
      {/* <Route path='/addperson' element={<AddPerson/>}/> */}
      <Route path='/movie_edit/:id' element={<MovieEdit/>}/>
      <Route path='/favourite/:id' element={<SingleMovieDetails/>}/>
    </Routes>
  )
}

export default AllRoutes
