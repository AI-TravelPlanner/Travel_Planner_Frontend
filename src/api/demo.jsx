import { useDispatch } from 'react-redux';
import { fetchTripPlan } from './apiService';
import { useNavigate } from 'react-router-dom';

const DemoNaz = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 2. Get the navigate function

    // 3. Make your handler async
    const handleGenerateNewPlan = async () => {
        const prompt = "Plan a 1-day trip to tokyo Japan, focusing on Tech.";

        try {
            // 4. Await the dispatch and .unwrap() the result
            await dispatch(fetchTripPlan({ prompt })).unwrap();

            // 5. If it gets here, it was FULFILLED!
            console.log('Fetch successful, navigating to dashboard...');
            navigate('/dashboard'); // <-- Go to your dashboard route

        } catch (error) {
            // 6. If it gets here, it was REJECTED
            console.error('Failed to fetch plan:', error);
            // You could show an error message to the user here
        }
    };

    return <button onClick={handleGenerateNewPlan}>Generate New Plan</button>;
};

export default DemoNaz;