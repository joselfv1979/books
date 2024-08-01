import styles from '@/assets/scss/home.module.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.library}>
            <button className={styles.viewLink} onClick={() => navigate('/books')}>View our Library</button>
        </div>
    );
};

export default Home;
