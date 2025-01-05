import { ChangeEvent, RefObject, useState } from 'react';
import { Button } from 'react-bootstrap';
import defaultImage from '../assets/images/default-image.svg';
import styles from '../assets/scss/loadFile.module.scss';

const baseUrl = import.meta.env.VITE_API_URL;

type Props = {
    image: string;
    fileInput: RefObject<HTMLInputElement>;
    handleFile: (event: ChangeEvent<HTMLInputElement>) => void // Form file handler
}

// Custom file loader component with loader and image preview
const LoadFile = ({ image, fileInput, handleFile }: Props) => {

    const imageUrl = `${baseUrl}/${image}`;

    // Preview state management
    const [preview, setPreview] = useState(image ? imageUrl : defaultImage);

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            handleFile(event);
        }
    };

    const handleClick = () => fileInput.current?.click();

    return (
        <>
            <label
                htmlFor='photo'
                className={styles.photoLabel}>Photo</label>
            <input
                id='photo'
                name="image"
                type="file"
                className={styles.photoInput}
                ref={fileInput}
                onChange={handleImage}
            />

            <div className={styles.photoContainer}>
                <img src={preview} alt='preview' className={styles.photo} />
            </div>

            <Button variant="primary" className={styles.uploadButton} onClick={handleClick}>
                Upload
            </Button>
        </>
    )
}

export default LoadFile;