import '../cssFiles/HomePage.css';

import { AppContext } from '../../context/AppContext';
import { useContext, userContext } from 'react';

function HomePage(props) {

    const { userState } = useContext(AppContext);
    const [user] = userState;

    return (
        <div className='HomePage'>
            {user.authorization ?
                <p>Hello, {user.username}</p>
                :
                null
            }
            <p>Welcome to SHAMazon! Where we don't really sell anything at all!</p>
        </div>
    )
}

export default HomePage;