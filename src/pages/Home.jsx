import React, { useState, useEffect, useRef } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import {
  getPopularMovies,
  searchMovies,
  getActionMovies,
  getRomanceMovies,
  getAnimatedMovies,
} from "../services/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [actionMovies, setActionMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);

  const popularScrollRef = useRef(null);
  const actionScrollRef = useRef(null);
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to Load Movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();

    // for loading action movies in case you didnt notice
    const loadActionMovies = async () => {
      try {
        const actionMovies = await getActionMovies();
        setActionMovies(actionMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load");
      }
    };
    loadActionMovies();

    // Function for loading animated movies into MovieCard component
    const loadAnimatedMovies = async () => {
      try {
        const animatedMovies = await getAnimatedMovies();
        setAnimatedMovies(animatedMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load");
      }
    };
    loadAnimatedMovies();

    const loadRomanceMovies = async () => {
      try {
        const romanceMovies = await getRomanceMovies();
        setRomanceMovies(romanceMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load");
      }
    };
    loadRomanceMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    setIsSearch(true); // Indicate that it's a search

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }

    setSearchQuery("");
  };

  // Scroll function for Popular Movies
  const scrollLeftPopular = () => {
    if (popularScrollRef.current) {
      popularScrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRightPopular = () => {
    if (popularScrollRef.current) {
      popularScrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  // Scroll function for Action Movies
  const scrollLeftAction = () => {
    if (actionScrollRef.current) {
      actionScrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRightAction = () => {
    if (actionScrollRef.current) {
      actionScrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="home">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-container">
          <h2 className="header">
            {isSearch ? "Search Results" : "Popular Movies"}
          </h2>

          {/* Popular Movies Row */}
          <div className="movies-row" ref={popularScrollRef}>
            {error ? (
              <p>{error}</p>
            ) : (
              movies.map((movie) => (
                <MovieCard
                  width="250px"
                  height="100%"
                  movie={movie}
                  key={movie.id}
                />
              ))
            )}
          </div>

          <h2 className="header">
            <b>Action Movies</b>
          </h2>

          {/* Action Movies Row */}
          <div className="movies-row mtop" ref={actionScrollRef}>
            {error ? (
              <p>{error}</p>
            ) : (
              actionMovies.map((actionMovie) => (
                <MovieCard
                  width="250px"
                  height="100%"
                  movie={actionMovie}
                  key={actionMovie.id}
                />
              ))
            )}
          </div>

          <h2 className="header">
            <b>Animated Movies</b>
          </h2>

          {/* Animated Movies Row */}
          <div className="movies-row mtop" ref={actionScrollRef}>
            {error ? (
              <p>{error}</p>
            ) : (
              animatedMovies.map((animatedMovie) => (
                <MovieCard
                  width="250px"
                  height="100%"
                  movie={animatedMovie}
                  key={animatedMovie.id}
                />
              ))
            )}
          </div>

          {/* Romance Movies */}

          <h2 className="header">
            <b>Romance Movies</b>
          </h2>

          <div className="movies-row mtop" ref={actionScrollRef}>
            {error ? (
              <p>{error}</p>
            ) : (
              romanceMovies.map((romanceMovie) => (
                <MovieCard
                  width="250px"
                  height="100%"
                  movie={romanceMovie}
                  key={romanceMovie.id}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
