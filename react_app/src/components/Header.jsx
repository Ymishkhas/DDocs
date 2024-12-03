import { CogIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/16/solid';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { registerUser } from '../services/api.js';
import SelectButton from './SelectButton';
import '../styles/Header.css';

const Header = () => {

    const { login, logout, user } = useAuth();
    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const result = await login();
            const user_data = result.user;
            const createdAt = user_data.metadata.createdAt;
            const current = new Date();
            if (current - createdAt < 15000) {
                const userInfo = {
                    'user_id': user_data.uid,
                    'username': user_data.displayName,
                    'fullname': user_data.displayName,
                    'email': user_data.email
                };
                const response = await registerUser(userInfo);
                if (!response.status === 201) {
                    throw new Error('Failed to register user');
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleLogout() {
        try {
            await logout();
            // navigate('/');
        } catch {
            console.error('Failed to logout');
        }
    }

    return (
        <header>
            <nav>
                <Link to="/">Search DDocs</Link>
                {user ? (
                    <div>
                        <SelectButton
                            icon={<img src={user.photoURL} alt='User profile' />}
                            text={user.displayName}
                            options={[
                                { icon: <CogIcon />, text: 'Settings', onClick: () => console.log('() => navigate(/profile)') },
                                { icon: <ArrowRightStartOnRectangleIcon />, text: 'Logout', onClick: handleLogout }
                            ]}
                        />
                    </div>
                ) : (
                    <button id='login-button' onClick={handleLogin}>Sign in with Google</button>
                )}
            </nav>
        </header>
    )
}

export default Header;