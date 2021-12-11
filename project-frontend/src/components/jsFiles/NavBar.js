import '../cssFiles/NavBar.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

function NavBar(props) {

    const { userState } = useContext(AppContext);
    const [user, setUser] = userState;

    function handleLogoutClick() {
        setUser({});
        localStorage.removeItem('userId');
    }

    return (
        <>
            <h1>ShAmazon?</h1>
            <nav className='NavBar'>
                <Link to='/'>Home Page</Link>
                {
                    user.id ?
                        <>
                            <Link to='/shop'>Shop Plants</Link>
                            <Link to='/cart'>My Cart</Link>
                            <Link to='/orders'>My Orders</Link>
                            <span onClick={handleLogoutClick}>Logout</span>
                        </>
                        :
                        <Link to='/login'>Signup / Login</Link>
                }
            </nav>
        </>
    )
}

export default NavBar;