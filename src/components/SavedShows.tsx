import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
interface Movie {
  id: number;
  title: string;
  overview: string;
  img: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  adult: boolean;
  video: boolean;
}
export default function SavedShows() {
  const { user } = UserAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  useEffect(() => {
    if (!user?.email) return;
    const userDocRef = doc(db, "users", user.email);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      setMovies(doc.data()?.savedShows || []);
    });

    return () => unsubscribe();
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);

  const deleteShow = async (passedId: number) => {
    try {
      const res = movies.filter((item) => item.id !== passedId);
      await updateDoc(movieRef, { savedShows: res });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          className="bg-white left-0 rounded-full absolute cursor-pointer opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
          size={40}
          onClick={slideLeft}
        ></MdChevronLeft>
        <div
          id={"slider"}
          className="w-full h-full overflow-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-[160px sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/original/${item?.img}`}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item.title}
                </p>
                <p>
                  {" "}
                  <AiOutlineClose
                    onClick={() => deleteShow(item.id)}
                    className="absolute text-gray-400 top-4 right-4"
                  ></AiOutlineClose>{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute cursor-pointer opacity-50 hover:opacity-100 z-10  hidden group-hover:block"
          size={40}
        ></MdChevronRight>
      </div>
    </div>
  );
}
