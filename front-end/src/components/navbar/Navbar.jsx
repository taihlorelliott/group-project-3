import '../../index.css';

// bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = ({handleSection}) => {
    return (
        <nav className="bg-dark mt-2 ms-2 mb-2" id="top-navbar">
            <button onClick={handleSection} className="btn btn-outline-info me-2" value="Home"> Home </button>
            <button onClick={handleSection} className="btn btn-outline-info me-2" value="GameSection"> Games </button>
            <button onClick={handleSection} className="btn btn-outline-info me-2" value="PlayerSection"> Players </button>
        </nav>
    );
};

export default Navbar;