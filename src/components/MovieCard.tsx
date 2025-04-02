import { useState } from "react";
import { FaHeart, FaRegHeart, FaPlay } from "react-icons/fa";
import { Movie } from "../types/movie";
import { UserAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function MovieCard({ item, id }: { item: Movie; id: number }) {
  const [like, setLike] = useState<boolean>(false); // track the movie is saved
  const { user } = UserAuth();
  const navigate = useNavigate();
  const movieID = doc(db, "users", `${user?.email}`); // reference of the document

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  function loadPlayer(id: number) {
    navigate(`/player/${id}`);
  }

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white flex flex-col justify-center items-center">
        <p className="text-xs md:text-sm font-bold text-center mb-2">
          {item.title}
        </p>
        <button
          onClick={() => loadPlayer(id)}
          className="p-2 text-white flex items-center justify-center hover:text-gray-300 transition"
        >
          <FaPlay className="cursor-pointer" size={30} />
        </button>
        <p onClick={saveShow} className="absolute cursor-pointer top-4 left-4">
          {like ? (
            <FaHeart className="text-gray-300" />
          ) : (
            
            <FaRegHeart className="text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
}
