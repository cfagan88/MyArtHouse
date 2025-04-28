function ArtCard({ record }) {
  return (
    <div className="flex flex-col bg-gray-800 p-4 rounded-lg h-full min-h-[400px] min-w-[200px]">
      <div className="flex-grow text-center flex flex-col">
        <p className="text-xl font-bold line-clamp-2">{record.title}</p>
        <p className="mb-4">{record.classification}</p>
        <div className="flex-grow flex items-center justify-center">
          {record.images?.[0]?.baseimageurl ? (
            <img
              className="mb-4 mx-auto max-h-80 w-auto object-contain rounded shadow"
              src={record.images[0].baseimageurl}
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
      </div>
      <div className="text-center mt-auto">
        {<p>{record.people?.[0].name || "Unidentified Artist"}</p>}
        {<p className="text-sm">{record.dated}</p>}
        {<p className="text-sm">Harvard Art Museums/Fogg Museum</p>}
      </div>
    </div>
  );
}

export default ArtCard;
