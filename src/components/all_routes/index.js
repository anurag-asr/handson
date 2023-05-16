import React from "react";
import { Routes, Route } from "react-router-dom";
import SingleMovieDetails from "../../pages/single_movie_details";
import MovieEdit from "../../pages/movie_edit";
import AddMovie from "../../pages/add_movie";
import Login from "../../pages/login";
import Persons from "../../pages/persons";
import MovieListing from "../../pages/movies";
import Home from "../../pages/home_page";
import RequireAuth from "../../pages/require_auth";

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
        path="/movie/edit/:id"
        element={
          <RequireAuth>
            <MovieEdit />
          </RequireAuth>
        }
      />
      <Route
        path="/movie/create"
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
        path="/details/:id"
        element={
          <RequireAuth>
            <SingleMovieDetails />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
