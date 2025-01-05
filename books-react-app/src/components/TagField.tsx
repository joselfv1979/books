import { ChangeEvent, Dispatch, Fragment, SetStateAction, useState } from "react";
import styles from '../assets/scss/bookForm.module.scss';
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
            setValues((prev: Book) => ({
                ...prev, genre: [...prev.genre, newTag]
            }));
        }
    }

    const handleRemoveTag = (tag: string) => {
        setValues((prev: Book) => ({
            ...prev, genre: prev.genre.filter((t) => t !== tag)
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
        <fieldset className={styles.tagList}>
            {tags.map((tag: string) => (
                <Fragment key={tag}> {/* Use tag itself as key if it's unique */}
                    <Tag tag={tag} handleRemoveTag={handleRemoveTag} />
                </Fragment>
            ))}
            <input type={tags.length < MAX_TAGS ? 'text' : 'hidden'} className={styles.tagsInput}
                name="genre"
                placeholder={tags.length == 0 ? "Genre" : ''}
                onKeyDown={handleKeyPress}
                onChange={handleInputChange}
                value={userInput}
                disabled={tags.length === MAX_TAGS} />
        </fieldset>
    );
};