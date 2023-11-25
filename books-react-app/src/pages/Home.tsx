import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../scss/home.module.scss';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.library}>
            <h2 onClick={() => navigate('/books')}>View our Library</h2>
        </div>
    );
};

export default Home;
