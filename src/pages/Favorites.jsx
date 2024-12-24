import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useRef } from "react";

function Favorites() {
  const { favorites } = useMovieContext();
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Scroll left by 300px
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Scroll right by 300px
        behavior: "smooth",
      });
    }
  };

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="scroll-buttons">
          <button className="scroll-left" onClick={scrollLeft}>
            &larr;
          </button>
          <button className="scroll-right" onClick={scrollRight}>
            &rarr;
          </button>
        </div>
        <div className="movies-grid" ref={scrollContainerRef}>
          {favorites.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              width="250px"
              height="375px"
              margin="10px"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
