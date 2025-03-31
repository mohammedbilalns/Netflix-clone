import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Player = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_FIREBASE_BEARER_ID}`,
            },
          },
        );
        setApiData(response.data.results[0] || {});
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideo();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-8xl h-[700px]">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-center mt-4 text-white">
        <p className="text-gray-400">{apiData.published_at?.slice(0, 10)}</p>
        <p className="text-lg font-semibold">{apiData.name}</p>
        <p className="text-sm text-gray-300">{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
