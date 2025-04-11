function ArtCard({ record }) {
  console.log(record);
  return (
    <div>
      <div>
        <p className="text-xl font-bold">{record.title}</p>
        <p className="mb-4">{record.classification}</p>
        {record.images?.[0]?.baseimageurl && (
          <img
            className="mb-4 min-w-[100px] max-w-[400px]"
            src={record.images[0].baseimageurl}
          />
        )}
        {<p>{record.people?.[0].name || "Unidentified Artist"}</p>}
      </div>
    </div>
  );
}

export default ArtCard;
