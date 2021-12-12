import '../cssFiles/Header.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

function Header(props) {

    const { userState } = useContext(AppContext);
    const [user, setUser] = userState;

    const navigation = useNavigate();

    function handleLogoutClick() {
        setUser({});
        localStorage.removeItem('shamazon_token');
    }

    return (
        <div className='Header'>
            <h1>SHAMazon</h1>
            <nav className='NavBar'>
                <button onClick={() => { navigation('/') }}>Home</button>
                {
                    user.authorization ?
                        <>
                            <button onClick={() => { navigation('/shop') }}>Shop Plants</button>
                            <button onClick={() => { navigation('/cart') }}>My Cart</button>
                            <button onClick={() => { navigation('/orders') }}>My Orders</button>
                            <button onClick={handleLogoutClick}>Logout</button>
                        </>
                        :
                        <button onClick={() => { navigation('/login') }}>Signup / Login</button>
                }
            </nav>
        </div>
    )
}

export default Header;