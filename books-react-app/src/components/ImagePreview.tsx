import React from 'react';
import styles from '../assets/scss/formImage.module.scss';

type Props = {
    image?: File;
    preview?: string;
};

const ImagePreview = ({ image, preview }: Props) => {
    return (
        <span className={styles.photo_container}>
            {image ? (
                <>
                    <img src={preview} className={styles.photo} />
                    {image.name}
                </>
            ) : (
                'no file selected'
            )}
        </span>
    );
};

export default ImagePreview;
