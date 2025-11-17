import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTripById } from '../api/apiService';

// const TripListItem = ({ trip }) => {
const TripListItem = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tripid = "691ae7b3042dbaa7df93154a"

    const handleViewTrip = async () => {
        // 1. Dispatch the thunk with the Trip ID
        const resultAction = await dispatch(fetchTripById(tripid));

        // 2. Check if it worked
        if (fetchTripById.fulfilled.match(resultAction)) {
            // 3. Redirect to the Dashboard / Planner view
            // The Redux state is now populated with this trip's data!
            navigate('/dashboard'); 
        } else {
            alert("Failed to load trip details.");
        }
    };

    return (
        <div className="trip-card">
            <h3>Demo</h3>
            <button onClick={handleViewTrip}>View Plan</button>
        </div>
    );
};

export default TripListItem;