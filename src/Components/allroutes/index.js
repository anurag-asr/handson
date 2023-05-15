import React from "react";
import { Routes, Route } from "react-router-dom";
import SingleMovieDetails from "../../pages/SingleMovieDetails";
import MovieEdit from "../../pages/movieedit";
import AddMovie from "../../pages/addmovie";
import Login from "../../pages/login";
import Persons from "../../pages/persons";
import MovieListing from "../../pages/movies";
import Home from "../../pages/homepage";
import RequireAuth from "../../pages/requireauth";
import Scrolling from "../../pages/scoll";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/movies"
        element={
          <RequireAuth>
            <MovieListing />
          </RequireAuth>
        }
      />
      <Route
        path="/movie_edit/:id"
        element={
          <RequireAuth>
            <MovieEdit />
          </RequireAuth>
        }
      />
      <Route
        path="/addmovie"
        element={
          <RequireAuth>
            <AddMovie />
          </RequireAuth>
        }
      />
      <Route
        path="/person"
        element={
          <RequireAuth>
            <Persons />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />

      <Route
        path="/detailsmovie/:id"
        element={
          <RequireAuth>
            <SingleMovieDetails />
          </RequireAuth>
        }
      />

<Route
        path="scroll"
        element={
         <Scrolling/>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
