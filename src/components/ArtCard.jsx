function ArtCard({ record }) {
  return (
    <div className="flex flex-col bg-gray-800 p-4 rounded-lg h-full min-h-[400px] min-w-[300px]">
      <div className="flex-grow text-center flex flex-col">
        <p className="text-xl font-bold line-clamp-2">{record.title}</p>
        <p className="mb-4">{record.classification}</p>
        {record.images?.[0]?.baseimageurl && (
          <div className="flex-grow flex items-center justify-center">
            <img
              className="mb-4 mx-auto max-h-80 w-auto object-contain rounded shadow"
              src={record.images[0].baseimageurl}
            />
          </div>
        )}
      </div>
      <div className="text-center mt-auto">
        {<p>{record.people?.[0].name || "Unidentified Artist"}</p>}
      </div>
    </div>
  );
}

export default ArtCard;
