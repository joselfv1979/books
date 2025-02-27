import styles from '../assets/scss/bookForm.module.scss';

interface Props {
    tag: string;
    handleRemoveTag: (tag: string) => void
}

const Tag = ({ tag, handleRemoveTag }: Props) => {

    return (
        <div className={styles.tag}>
            {tag}
            <button type="button" className={styles.closeButton} aria-label="Close" onClick={() => handleRemoveTag(tag)}>
                &times;
            </button>
        </div>
    )
}

export default Tag;