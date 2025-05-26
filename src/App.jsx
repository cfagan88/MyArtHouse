import "./index.css";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import SingleHarvardArtwork from "./components/SingleHarvardArtwork";
// import SingleAICArtwork from "./components/SingleAICArtwork";
import SingleCMAArtwork from "./components/SingleCMAArtwork";
import { CollectionsProvider } from "./contexts/collectionsContext";

function App() {
  return (
    <main>
        <NavBar />
      <CollectionsProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route
            path="/artwork/harvard/:id"
            element={<SingleHarvardArtwork />}
          />
          {/* <Route path="/artwork/aic/:id" element={<SingleAICArtwork />} /> */}
          <Route path="/artwork/cma/:id" element={<SingleCMAArtwork />} />
        </Routes>
      </CollectionsProvider>
    </main>
  );
}

export default App;
