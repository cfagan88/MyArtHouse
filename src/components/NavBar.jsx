import Logo from "../assets/ArtHouseColumnCircle.png";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl px-4">
        <div className="flex justify-start items-center h-16 space-x-8">
          <Link to="/" className="w-10 h-10 block">
            <img className="w-full h-full object-contain" src={Logo} alt="MyArtHouse Logo" />
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/collections"
              className="text-gray-300 hover:text-white transition-colors"
            >
              My Collections
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
