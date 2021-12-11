import '../cssFiles/NavBar.css';
import { Link } from 'react-router-dom';

function NavBar(props) {
    return (
        <>
            <h1>ShAmazon?</h1>
            <nav className='NavBar'>
                <Link to='/'>Home Page</Link>
                <Link to='/login'>Signup / Login</Link>
                <Link to='/shop'>Shop Plants</Link>
                <Link to='/cart'>My Cart</Link>
                <Link to='/orders'>My Orders</Link>
            </nav>
        </>
    )
}

export default NavBar;