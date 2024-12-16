import '../index.css';
// bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
    return (
        <>
            <div className="bg-dark text-info text-center">
                <img className="img-fluid" src="../../public/images/logo.png"/>
                <p className="fs-4"> An app to organize your favorite games and see what others are playing.</p>
            </div>
            <footer className="bg-dark text-info text-center">
                <p className="fs-6 fw-lighter" >♡ An app by the pookies for the pookies of the world ♡ </p>
            </footer>
        </>
        
    );
};

export default Home;