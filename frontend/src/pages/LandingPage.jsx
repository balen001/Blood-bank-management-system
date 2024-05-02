import ResponsiveAppBar from '../components/ResponsiveAppBar';
import backgroundImage from '../assets/backgroundImage.svg';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;
function LandingPage(){
    return (
        <>
        



            <GlobalStyle/>
            <div style={{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundColor: '#040E28', 
                margin: '0', 
                backgroundSize: '70%', 
                backgroundRepeat: 'no-repeat',
                height: '100vh' // Set the height to 100% of the viewport height
            }}>
              <ResponsiveAppBar />

            </div>





        </>
    )

}

export default LandingPage;