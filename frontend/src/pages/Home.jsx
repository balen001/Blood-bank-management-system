import { useLocation } from 'react-router-dom';
import DonorHome from './Donor/DonorHome';
import PatientHome from './Patient/PatientHome';


function Home() {
    const location = useLocation();
    let user_type = location.state ? location.state.user_type : null;


    // If user_type is null, try to get it from localStorage
    if (!user_type) {
        user_type = localStorage.getItem('user_type');
    } else {
        // If user_type is not null, store it in localStorage
        localStorage.setItem('user_type', user_type);
    }

    if (user_type === 'donor') {
        return <DonorHome />;
    } else if (user_type === 'patient') {
        return <PatientHome />;
    }

    // Return a default component or null if user_type is not 'donor' or 'patient'
    return null;
}

export default Home;