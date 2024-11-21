import { ChangeEvent, Dispatch, Fragment, SetStateAction, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styles from '../assets/scss/tagList.module.scss';
import { Book } from "../types/Book";
import Tag from "./Tag";

interface Props {
    values: Book;
    setValues: Dispatch<SetStateAction<Book>>;
}

export const TagField = ({ values, setValues }: Props) => {

    const MAX_TAGS = 4;
    const { genre: tags } = values;

    const [userInput, setUserInput] = useState<string>("");

    const handleAddTag = (newTag: string) => {

        if (newTag && !tags.includes(newTag) && tags.length < MAX_TAGS) {
            setValues((prevValues: Book) => ({
                ...prevValues,
                genre: [...prevValues.genre, newTag]
            }));
        }
    }

    const handleRemoveTag = (tag: string) => {
        setValues((prevValues: Book) => ({
            ...prevValues,
            genre: prevValues.genre.filter((t) => t !== tag)
        }));
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const trimmedInput = userInput.trim();
            if (trimmedInput !== "" && trimmedInput.length <= 12 && tags.length < MAX_TAGS) {
                handleAddTag(trimmedInput);
                setUserInput("");
            }
        }
    };

    return (
        <div className="flex flex-col">
            <FloatingLabel controlId="genre" label="Genre">
                <Form.Control
                    name="genre"
                    type="text"
                    placeholder={tags.length < MAX_TAGS ? "Add a tag" : `You can only enter max. of ${MAX_TAGS} tags`}
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                    value={userInput}
                    disabled={tags.length === MAX_TAGS}
                    className={styles.inputText}
                />
            </FloatingLabel>
            <div className={styles.tagList}>
                {tags.map((tag: string) => (
                    <Fragment key={tag}> {/* Use tag itself as key if it's unique */}
                        <Tag tag={tag} handleRemoveTag={handleRemoveTag} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
};