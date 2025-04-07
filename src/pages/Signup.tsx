import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState } from "react";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const [loading , setLoading] = useState(false)
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  console.log(user);

  if(loading){
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <>
      <div className="w-full h-screen relative">
        {/* Background Image */}
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_large.jpg"
          srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_small.jpg 959w"
          alt=""
          className="hidden sm:block  absolute w-full h-full object-cover"
        />
        {/* overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />
        <div className="absolute w-full px-4 py-24 z-20">
          {/* form container */}
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white p-8 rounded">
            <div className="mx-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button
                  type="submit"
                  className="bg-red-600 py-3 my-6 rounded font-bold cursor-pointer"
                >
                  Sign Up
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input className="mr-2 " type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8 ">
                  <span className="text-gray-600">
                    Already subscribed to Netflix
                  </span>{" "}
                  <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
