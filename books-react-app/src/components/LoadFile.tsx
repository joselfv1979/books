// import { ChangeEvent, RefObject, useState } from 'react';
// import defaultImage from '../assets/images/default-image.svg';
// import styles from '../assets/scss/loadFile.module.scss';

// const baseUrl = import.meta.env.VITE_API_URL;

// type Props = {
//     image: string;
//     fileInput: RefObject<HTMLInputElement>;
//     handleFile: (event: ChangeEvent<HTMLInputElement>) => void // Form file handler
// }

// // Custom file loader component with loader and image preview
// const LoadFile = ({ image, fileInput, handleFile }: Props) => {

//     const imageUrl = `${baseUrl}/${image}`;

//     // Preview state management
//     const [preview, setPreview] = useState(image ? imageUrl : defaultImage);

//     const handleImage = (event: ChangeEvent<HTMLInputElement>) => {

//         const file = event.target.files?.[0];
//         if (file) {
//             const objectUrl = URL.createObjectURL(file);
//             setPreview(objectUrl);
//             handleFile(event);
//         }
//     };

//     const handleClick = () => fileInput.current?.click();

//     return (
//         <>
//             <label
//                 htmlFor='photo'
//                 className={styles.photoLabel}>Photo</label>
//             <input
//                 id='photo'
//                 name="image"
//                 type="file"
//                 className={styles.photoInput}
//                 ref={fileInput}
//                 onChange={handleImage}
//             />

//             <div className={styles.photoContainer}>
//                 <img src={preview} alt='preview' className={styles.photo} />
//             </div>

//             <Button variant="primary" className={styles.uploadButton} onClick={handleClick}>
//                 Upload
//             </Button>
//         </>
//     )
// }

// export default LoadFile;

import React, { ChangeEvent, RefObject, useState } from "react";
import defaultImage from "../assets/images/default-image.svg";
import Button from "./ui/Button";

const baseUrl = import.meta.env.VITE_API_URL;

type Props = {
    image?: string;
    fileInput: RefObject<HTMLInputElement>;
    handleFile: (event: ChangeEvent<HTMLInputElement>) => void;
};

const LoadFile: React.FC<Props> = ({ image, fileInput, handleFile }) => {
    const initial = image ? `${baseUrl}/${image}` : defaultImage;
    const [preview, setPreview] = useState<string>(initial);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            handleFile(e);
        }
    };

    const openPicker = () => fileInput.current?.click();

    return (
        <div className="space-y-3">
            <input
                ref={fileInput}
                id="photo"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onChange}
                data-testid="photo-input"
            />
            <div className="w-40 aspect-[3/4] rounded-lg overflow-hidden bg-surface-muted flex items-center justify-center border">
                <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                    onError={() => setPreview(defaultImage)}
                />
            </div>
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={openPicker}
                    className="text-xs px-3 py-1"
                >
                    Upload
                </Button>
                {preview !== defaultImage && (
                    <Button
                        type="button"
                        variant="accent"
                        onClick={() => setPreview(defaultImage)}
                        className="text-xs px-3 py-1"
                    >
                        Reset
                    </Button>
                )}
            </div>
            <p className="text-[11px] text-brand-700">
                JPG/PNG up to 2MB. Preview updates immediately.
            </p>
        </div>
    );
};

export default LoadFile;