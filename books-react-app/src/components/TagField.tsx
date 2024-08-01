import styles from '@/assets/scss/tagList.module.scss';
import useTagInput from "@/hooks/useTag";
import { Book } from "@/types/Book";
import { ChangeEvent, Fragment, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Tag from "./Tag";

interface Props {
    values: Book;
    setValues: (values: Book) => void;
}

export const TagField = ({ values, setValues }: Props) => {

    //define the MaxTags
    const MAX_TAGS = 4;

    //Retrieve all the returned items from the hook
    const { tags, handleAddTag, handleRemoveTag } = useTagInput(MAX_TAGS, values.genre); // pass the maximum tags

    // track the use input
    const [userInput, setUserInput] = useState<string>("");

    // Handle input onChange
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    // handle Enter key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission or new line creation

            if (
                userInput.trim() !== "" &&
                userInput.length <= 12 &&
                tags.length < MAX_TAGS
            ) {
                handleAddTag(userInput);
                setValues({ ...values, genre: [...tags, userInput] });
                setUserInput(""); // Clear the input after adding a tag
            }
        }
    };

    return (
        <div className="flex flex-col">
            <FloatingLabel
                controlId="genre"
                label="Genre"
            >
                <Form.Control
                    name="genre"
                    type="text"
                    placeholder={
                        tags.length < MAX_TAGS
                            ? "Add a tag"
                            : `You can only enter max. of ${MAX_TAGS} tags`
                    }
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                    value={userInput}
                    disabled={tags.length === MAX_TAGS}
                    className={styles.inputText}
                />
            </FloatingLabel>
            <div className={styles.tagList}>
                {tags.map((tag: string, index: number) => (
                    <Fragment key={`${index}-${tag}`}>
                        <Tag tag={tag} handleRemoveTag={handleRemoveTag} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
};