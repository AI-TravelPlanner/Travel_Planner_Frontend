import React, { useState } from 'react';
// 1. Import the function we want to test
import { generateTrip } from '@/api/apiService';

function DemoApi() {
    // 2. Setup local state for the form, data, and loading
    const [prompt, setPrompt] = useState('');
    const [tripPlan, setTripPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * 3. This function will be called when the button is clicked
     */
    const handleGenerateClick = async () => {
        setIsLoading(true);
        setError(null);
        setTripPlan(null);

        try {
            // 4. Call the API function directly
            const data = await generateTrip(prompt);
            // 5. Store the returned JSON in our state
            setTripPlan(data);
        } catch (err) {
            // 6. If it fails, store the error
            setError(err.message);
        } finally {
            // 7. Stop the loading spinner
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Trip Plan Generator (Test)</h1>
            <textarea
                rows="3"
                cols="50"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt, e.g., A 3-day trip to Rome"
            />
            <br />
            <button
                onClick={handleGenerateClick}
                disabled={isLoading}
            >
                {isLoading ? 'Generating...' : 'Generate Trip'}
            </button>

            {/* --- This is where the results will appear --- */}

            {error && (
                <div style={{ color: 'red', marginTop: '15px' }}>
                    <h3>Error:</h3>
                    <pre>{error}</pre>
                </div>
            )}

            {tripPlan && (
                <div style={{ marginTop: '15px' }}>
                    <h3>Generated Plan:</h3>
                    {/* We use <pre> to format the JSON nicely */}
                    <pre style={{ background: '#f4f4f4', padding: '10px' }}>
                        {JSON.stringify(tripPlan, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default DemoApi;