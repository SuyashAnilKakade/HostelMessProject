type Room = {
  roomNumber: string | number;
  roomType: string;
  capacity: number;
  services: string;
  status: string;
};

type Props = {
  room: Room;
  onRequest?: () => void;
};

export default function RoomCard({ room, onRequest }: Props) {
  return (
    <div className="bg-white rounded shadow p-4 hover:shadow-lg transition">

      <h2 className="text-lg font-bold">
        Room {room.roomNumber}
      </h2>

      <p>Type: {room.roomType}</p>

      <p>Capacity: {room.capacity}</p>

      <p>Services: {room.services}</p>

      <p>
        Status:{" "}
        <span
          className={
            room.status === "Available"
              ? "text-green-600 font-semibold"
              : "text-red-500 font-semibold"
          }
        >
          {room.status}
        </span>
      </p>

      {/* Only show request button if room is available */}
      {room.status === "Available" && onRequest && (
        <button
          className="mt-3 bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 transition"
          onClick={onRequest}
        >
          Request Room
        </button>
      )}
    </div>
  );
}