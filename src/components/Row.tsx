import axios from "axios";
import { Movie } from "../types/movie";
import { useEffect, useState } from "react";
import { RowProps } from "../types/rowProps";
import MovieCard from "./MovieCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Row({ title, fetchUrl, rowId }: RowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    axios.get(fetchUrl).then((res) => {
      setMovies(res.data.results);
    });
  }, [fetchUrl]);

  const slideLeft = () => {
    const slider = document.getElementById("slider" + rowId);
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById("slider" + rowId);
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          className="bg-white left-0 rounded-full absolute cursor-pointer opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
          size={40}
          onClick={slideLeft}
        ></MdChevronLeft>
        <div
          id={"slider" + rowId}
          className="w-full h-full overflow-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((item, id) => (
            <MovieCard key={id} item={item}></MovieCard>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute cursor-pointer opacity-50 hover:opacity-100 z-10  hidden group-hover:block"
          size={40}
        ></MdChevronRight>
      </div>
    </>
  );
}
