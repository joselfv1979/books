import { ChangeEvent, RefObject, useState } from 'react';
import { Form } from 'react-bootstrap';
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
    const [preview, setPreview] = useState(image ? imageUrl : null);

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            handleFile(event);
        }
    };

    return (
        <>
            <label
                htmlFor='photo'
                className={styles.photoLabel}>Photo</label>
            <Form.Control
                id='photo'
                name="image"
                type="file"
                style={{ display: 'none' }}
                ref={fileInput}
                onChange={handleImage}
            />

            <div className={styles.photoContainer}>
                {preview ?
                    <img src={preview} alt='preview' className={styles.photo} />
                    : <span className={styles.photoNoFileText}>No file selected</span>
                }
            </div>
        </>
    )
}

export default LoadFile;