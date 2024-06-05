import useTagInput from "hooks/useTag";
import { useState, ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { Book } from "types/Book";

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
    const [userInput, setUserInput] = useState<string>(" ");

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
            />

            {/* ===== Render the tags here ===== */}

            <div className="flex flex-row flex-wrap gap-3 mt-4">
                {tags.map((tag: string, index: number) => (
                    <span
                        key={`${index}-${tag}`}
                        className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
                    >
                        {tag}
                        <button
                            className="ml-2 hover:text-blue-500"
                            onClick={() => handleRemoveTag(tag)}
                            title={`Remove ${tag}`}
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};