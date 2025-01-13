import { renewPlace } from "@/interface/city";

interface PlaceRowsProps {
  rows: renewPlace[];
}

const PlaceRows = (props: PlaceRowsProps) => {
  const rows = props.rows;
  if (rows.length === 0) return <></>;
  return (
    <>
      {rows.map((row) => {
        return (
          <div
            className="flex p-2 border rounded bg-white w-[80vw] md:w-[50vw] items-center justify-between"
            key={`${row.id}`}
          >
            <p>{`${row.stop_name} - ${row.name}`}</p>
            <p className="text-[#5E7FC3] font-bold text-2xl">{`${row.distance} km`}</p>
          </div>
        );
      })}
    </>
  );
};

export default PlaceRows;
