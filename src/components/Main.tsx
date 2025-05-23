import { useState } from "react";
import requests from "../Requests";
import { useEffect } from "react";
import { Movie } from "../types/movie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const movie: Movie = movies[Math.floor(Math.random() * movies.length)];
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(requests.requestPopular).then((res) => {
      setMovies(res.data.results);
    });
  }, []); // get movie details when component mounts

  const truncateString = (str: string, num: number) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  function loadPlayer(id: number) {
    navigate(`/player/${id}`);
  } // navigate to the trailer player page

  return (
    <div className="w-full h-[700px] text-white relative ">
      <div className="w-full h-full ">
        <div className="absolute w-full h-[700px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover z-0"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />

        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:5xl font-bold ">{movie?.title}</h1>
          <div className="my-4">
            <button
              onClick={() => loadPlayer(movie.id)}
              className="border bg-gray-200 hover:bg-gray-300  text-black border-gray-300 py-2 px-5 cursor-pointer"
            >
              Play
            </button>
            <button className="border text-white border-gray-300 cursor-pointer py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            {" "}
            Released: {movie?.release_date}
          </p>
          <p className="w-full md: max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
}
