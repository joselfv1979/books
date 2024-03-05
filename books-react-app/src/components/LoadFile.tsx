import { ChangeEvent, useState } from 'react'
import { Form } from 'react-bootstrap'
import styles from '../assets/scss/bookForm.module.scss';
import { Book } from 'types/Book';

type Props = {
    values: Book,
    fileInput: React.RefObject<HTMLInputElement>
    setValues: (value: React.SetStateAction<Book>) => void
}

const LoadFile = ({ values, fileInput, setValues }: Props) => {

    const { image, imagePath } = values;
    const imageExist = image ?? imagePath;

    const [preview, setPreview] = useState<string>('');

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;

        if (target.files) {
            setValues({ ...values, image: target.files[0] });

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(target.files[0]);
        }
    };

    return (
        <>
            <Form.Control
                name="image"
                type="file"
                style={{ display: 'none' }}
                ref={fileInput}
                onChange={handleImage}
            />
            <div className={styles.photo_container}>
                {imageExist ?
                    <>
                        <img src={preview || `${process.env.REACT_APP_API_URL}/${imagePath}`} alt='book' className={styles.photo} />
                        {image?.name}
                    </>
                    : <span>No file selected</span>}
            </div>
        </>
    )
}

export default LoadFile