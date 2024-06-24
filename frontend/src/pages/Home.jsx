import { useLocation } from 'react-router-dom';
import DonorHome from './Donor/DonorHome';
import PatientHome from './Patient/PatientHome';
import AdminHome from './Admin/AdminHome';


function Home() {
    const location = useLocation();
    let user_type = location.state ? location.state.user_type : null;
    let userId = location.state ? location.state.userId : null;
    let userName = location.state ? location.state.userName : null;

    
    console.log("user type is beforeee checking for homes: " + localStorage.getItem('user_type'))
    // If user_type is null, try to get it from localStorage
    if (!user_type || !userId) {
        user_type = localStorage.getItem('user_type');
        userId = localStorage.getItem('userId');
        userName = localStorage.getItem('userName');
    } else {
        // If user_type is not null, store it in localStorage
        localStorage.setItem('user_type', user_type);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
    }

    console.log("user type is before checking for homes: " + localStorage.getItem('user_type'))

    if (user_type === 'donor') {
        return <DonorHome />;
    } else if (user_type === 'patient') {
        return <PatientHome />;
    } else if (user_type === 'admin') {
        return <AdminHome />;
    }

    // Return a default component or null if user_type is not 'donor' or 'patient'
    return null;
}

export default Home;