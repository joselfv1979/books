import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/scss/book.module.scss';

type Props = {
    currentPage: string;
    previousPage: string;
    path: string;
};

/* Breadcrumb navigation */
const Breadcrumb: React.FC<Props> = ({ path, previousPage, currentPage }) => {
    return (
        <div className={styles.breadcrumbContainer}>
            <nav aria-label="breadcrumb" className={styles.breadcrumb}>
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><Link to={path} className={styles.crumbText}>{previousPage}</Link></li>
                    <li aria-current="page"><span className={styles.crumbTextDisplay}>{currentPage}</span></li>
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
