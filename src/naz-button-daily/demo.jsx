import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// 1. Import your new async thunk
import { fetchDailyOptions } from '@/kanban-feature/template-board-suggestions/thunk'; // Adjust this path as needed
import { StatefulButton } from '@/components/ui/stateful-button';


const GenerateDayOptionsButton = () => {
    const dispatch = useDispatch();

    // 2. Get the loading status from the 'aliasTemplates' slice
    // We use this to disable the button and show a "Loading..." message.
    const { status, error } = useSelector((state) => state.aliasTemplates);

    // 3. Get the main trip's details from your 'boards' slice.
    // The thunk needs this information to make the API call.
    // const tripDetails = useSelector((state) => state.boards.tripDetails);

    const isLoading = status === 'loading';

    // 4. This handler builds the request and dispatches the thunk
    const handleGenerateOptions = async () => {
        if (isLoading) return; // Don't do anything if already loading

        // --- HARDCODED REQUEST DATA ---
        // As you requested, we are hardcoding the payload here.
        // You will replace this later
        const requestData = {
            location: "Rome, Italy",
            dayNumber: 2,
            preferences: "art, low budget, good food",
            numberOfOptions: 3 // Ask for 3 options
        };

        // 4. Dispatch the thunk with the hardcoded request object
        console.log("Dispatching fetchDailyOptions with hardcoded data:", requestData);
        await dispatch(fetchDailyOptions(requestData));
    };

    return (
        <div>
            <StatefulButton onClick={handleGenerateOptions} disabled={isLoading}>
                {isLoading ? 'Finding Options' : 'Find Alternative Day Plans'}
            </StatefulButton>
            {status === 'failed' && (
                <p style={{ color: 'red', fontSize: '0.9em', maxWidth: '300px' }}>
                    Error: {error}
                </p>
            )}
        </div>
    );
}

export default GenerateDayOptionsButton;