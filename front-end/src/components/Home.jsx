import '../index.css';
// bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
    return (
        <div className="bg-dark text-info text-center">
            <img className="img-fluid" src="../../public/images/logo.png"/>
            <p> An app to organize your favorite games and see what others are playing.</p>
        </div>
    );
};

export default Home;