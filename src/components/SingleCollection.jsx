import { useCollectionsContext } from "../contexts/collectionsContext";
import { useParams } from "react-router-dom";
import HarvardArtCard from "../components/HarvardArtCard";
import CMAArtCard from "../components/CMAArtCard";

function SingleCollection() {
  const { name } = useParams();
  const { collections } = useCollectionsContext();

  const currCollection = collections.find(
    (collection) => collection.name === name
  );
  if (!currCollection) {
    return <div>Collection not found.</div>;
  }

  return (
    <div className="py-25 w-screen box-border">
      <div className="grid mx-auto px-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch">
        {currCollection.artworks.map((artwork) =>
          artwork.source === "Harvard" ? (
            <HarvardArtCard record={artwork} key={`harvard${artwork.id}`} />
          ) : (
            <CMAArtCard record={artwork} key={`cma${artwork.id}`} />
          )
        )}
      </div>
    </div>
  );
}

export default SingleCollection;
