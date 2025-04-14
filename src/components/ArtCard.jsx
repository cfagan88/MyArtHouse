function ArtCard({ record }) {
  // console.log(record);
  return (
    <div className="flex flex-col justify-between bg-gray-800 p-4 rounded-lg">
      <div className="text-center flex-grow">
        <p className="text-xl font-bold">{record.title}</p>
        <p className="mb-4">{record.classification}</p>
        {record.images?.[0]?.baseimageurl && (
          <img
            className="mb-4 mx-auto max-h-80 w-auto object-contain rounded shadow"
            src={record.images[0].baseimageurl}
          />
        )}
        {<p>{record.people?.[0].name || "Unidentified Artist"}</p>}
      </div>
    </div>
  );
}

export default ArtCard;
