import { useDispatch, useSelector } from 'react-redux';
import { logBoardsStateThunk } from '../redux-slices/thunkSave';


const SaveButton = () => {
    const dispatch = useDispatch();

    // 2. Get the 'user' object from your auth slice
    const { user } = useSelector((state) => state.auth);

    const handleClick = () => {
        // 3. Check if user is logged in before saving
        if (!user) {
            alert("Please log in to save your trip.");
            return;
        }

        // 4. Dispatch the thunk using the user's email as the ID
        console.log("Saving trip for user:", user.email);
        dispatch(logBoardsStateThunk(user.email));
    }

    return <button onClick={handleClick}>Log Boards State</button>;
}
export default SaveButton;
