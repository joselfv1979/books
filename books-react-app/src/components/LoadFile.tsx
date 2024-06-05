import { ChangeEvent, RefObject, useState } from 'react'
import { Form } from 'react-bootstrap'
import styles from '../assets/scss/loadFile.module.scss';

type Props = {
    image?: File, // Can receive a file 
    imagePath: string; // Or a file path
    fileInput: RefObject<HTMLInputElement>;
    handleFile: (event: ChangeEvent<HTMLInputElement>) => void // Form file handler
}

// Custom file loader component with loader and image preview
const LoadFile = ({ image, imagePath, fileInput, handleFile }: Props) => {

    const currentImagePath = `${process.env.REACT_APP_API_URL}/${imagePath}`;

    const imageExist = image ?? imagePath;
    const fileName = image ?? imagePath ? imagePath.replace("public\\", "") : "";

    // Preview state management
    const [preview, setPreview] = useState<string>(currentImagePath);

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        if (target.files) {
            handleFile(event);
            // Object to create the preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(target.files[0]);
        }
    };

    return (
        <>
            <label htmlFor='photo'>Photo</label>
            <Form.Control
                name="image"
                type="file"
                style={{ display: 'none' }}
                ref={fileInput}
                onChange={handleImage}
            />

            <div className={styles.photoContainer}>
                {imageExist ?
                    <img src={preview} alt='preview' className={styles.photo} />
                    : <span className={styles.photoNoFileText}>No file selected</span>
                }
            </div>
            <span className={styles.photoText}>{fileName}</span>
        </>
    )
}

export default LoadFile;