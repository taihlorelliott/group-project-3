import './Navbar.css';

const Navbar = ({handleSection}) => {
    return (
        <nav id="top-navbar">
            <button onClick={handleSection} value="Home"> Home </button>
            <button onClick={handleSection} value="GameIndex"> Games </button>
            <button onClick={handleSection} value="PlayerIndex"> Players </button>
        </nav>
    );
};

export default Navbar;