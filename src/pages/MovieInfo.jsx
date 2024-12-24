import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/MovieInfo.css";

function MovieDetails() {
  const { id } = useParams(); // Get movie ID from URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [API_KEY, setAPI_KEY] = useState("6281fb0079458eb4016319fa6e66a4d2");
  const [API_READ_ACCESS_TOKEN, setAPI_READ_ACCESS_TOKEN] = useState(
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjgxZmIwMDc5NDU4ZWI0MDE2MzE5ZmE2ZTY2YTRkMiIsIm5iZiI6MTczNDc5OTIxNC41MTksInN1YiI6IjY3NjZlZjZlOGNhNTNjYzZhNzVlMTc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H26lCZFoS1YQAJmKcyFPKjofuNEBYfS1aoV1C9En1V8",
  );

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&api_read_access_token=${API_READ_ACCESS_TOKEN}`,
        );
        const data = await response.json();
        setMovieDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
      <div className="movie-info">
        <h2 className="movie-title">{movieDetails.title}</h2>
        <p>
          <b>Overview</b>: {movieDetails.overview}
        </p>
        <p>
          <b>Release Date</b>: {movieDetails.release_date}
        </p>
        <p>
          <b>Rating</b>: {movieDetails.vote_average}
        </p>
      </div>
    </div>
  );
}

export default MovieDetails;
