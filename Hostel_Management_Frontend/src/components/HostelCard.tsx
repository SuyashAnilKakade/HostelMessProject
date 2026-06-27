import { useNavigate } from "react-router-dom";

type Props = { hostel: any };

export default function HostelCard({ hostel }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded shadow p-4">
      <img src={hostel.image} alt={hostel.name} className="w-full h-40 object-cover rounded mb-2"/>
      <h2 className="text-xl font-bold">{hostel.name}</h2>
      <p>{hostel.location}</p>
      <p>Total Rooms: {hostel.totalRooms}</p>
      <p>Available: {hostel.availableRooms}</p>
      <button
        className="mt-2 bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        onClick={() => navigate(`/student/hostel/${hostel.id}/rooms`)}
      >
        View Rooms
      </button>
    </div>
  );
}
