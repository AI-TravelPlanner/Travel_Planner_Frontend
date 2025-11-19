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

    // 3. Get filter data from the 'filter' slice
    const { province, city, budget, headCount } = useSelector((state) => state.filter);

    const isLoading = status === 'loading';

    // 4. This handler builds the request and dispatches the thunk
    const handleGenerateOptions = async () => {
        if (isLoading) return; // Don't do anything if already loading


        // Construct location string based on available data
        const locationString = city ? `${city}, ${province}` : province;

        // Construct preferences string based on budget and headcount
        // You might want to add more logic here to create a descriptive string
        // Example: "Budget: 0-50000, for 1 person"
        const preferencesString = `Budget: ${budget[0]}-${budget[1]}, People: ${headCount}`;

       // --- DYNAMIC REQUEST DATA ---
        const requestData = {
            location: locationString,
            dayNumber: 2, // You probably want to get this from props or another slice?
            preferences: preferencesString, 
            numberOfOptions: 3 
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