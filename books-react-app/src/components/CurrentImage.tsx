import React from 'react';
import styles from '../assets/scss/formImage.module.scss';

type Props = {
    imageUrl: string;
};

const CurrentImage = ({ imageUrl }: Props) => {
    return (
        <span className={styles.photo_container}>
            {imageUrl ? (
                <>
                    <img src={`${process.env.REACT_APP_API_URL}/${imageUrl}`} className={styles.photo} />
                    image
                </>
            ) : (
                'no file selected'
            )}
        </span>
    );
};

export default CurrentImage;
