import { TripSearchBar } from "./TripSearchBar";

export default function DemoPlanTrip() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-3/4 md:w-1/2 h-[60vh] bg-white rounded-2xl shadow-lg flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800">
          <TripSearchBar />
        </h1>
      </div>
    </div>
  );
}
