import { Link } from "react-router-dom";

function AICArtCard({ record }) {
  return (
    <div className="flex flex-col bg-gray-800 p-4 rounded-lg h-full min-h-[400px] min-w-[200px]">
      <Link to={`/artwork/${record.source.toLowerCase()}/${record.id}`}>
        <div className="flex-grow text-center flex flex-col">
          <p className="text-xl font-bold line-clamp-2">{record.updated_at}</p>
          <p className="text-xl font-bold line-clamp-2">{record.title}</p>
          <p className="mb-4">{record.artwork_type_title}</p>
          <div className="flex-grow flex items-center justify-center">
            {record.image_id ? (
              <img
                className="mb-4 mx-auto max-h-80 w-auto object-contain rounded shadow"
                src={`https://www.artic.edu/iiif/2/${record.image_id}/full/!843,843/0/default.jpg`} //used bang (!) to fit image without scaling up outside of limits
                alt={`${record.title} by ${
                  record.artist_title || "Unidentified Artist"
                }`}
              />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
        </div>
        <div className="text-center mt-auto">
          {<p>{record.artist_title || "Unidentified Artist"}</p>}
          {<p className="text-sm">{record.date_display}</p>}
          {<p className="text-sm">Art Institute of Chicago</p>}
        </div>
      </Link>
    </div>
  );
}

export default AICArtCard;
