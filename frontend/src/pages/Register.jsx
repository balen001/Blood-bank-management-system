import RegisterComp from '../components/RegisterComp';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import backgroundImage from '../assets/backgroundImage.svg';
import { createGlobalStyle } from 'styled-components';
import { useLocation } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;
const Register = () => {

    const location = useLocation();
    const register_as = location.state?.register_as;
  
    console.log(register_as);


    return (
        <>
            <GlobalStyle />
            <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundColor: '#040E28', margin: '0', backgroundSize: '70%', backgroundRepeat: 'no-repeat' }}>
                <ResponsiveAppBar />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '8em', marginTop: '2em' }}>
                    <RegisterComp register_as={register_as} />
                </div>
            </div>
        </>

    )

}

export default Register;