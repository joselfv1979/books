import { Dispatch, SetStateAction } from "react";
import styles from '../assets/scss/books.module.scss';
import { useAppSelector } from "../hooks/redux-hooks";

type Props = {
    setQuery: Dispatch<SetStateAction<{ search?: string; page: number }>>;
}

const PaginationComponent = ({ setQuery }: Props) => {

    const { totalPages, currentPage } = useAppSelector((state) => state.book);

    const isPaginationShown = Number(totalPages) > 1;
    const isCurrentPageFirst = Number(currentPage) === 1;
    const isCurrentPageLast = Number(currentPage) === Number(totalPages);

    const handlePage = (page = 1) => {
        const nextPage = Math.max(1, Math.min(page, Number(totalPages)));
        setQuery((prevState) => ({ ...prevState, page: nextPage }));
    }

    let isPageNumberOutOfRange: boolean;

    const pageNumbers = [...new Array(Number(totalPages))].map((_, index) => {
        const pageNumber = index + 1;
        const isPageNumberFirst = pageNumber === 1;
        const isPageNumberLast = pageNumber === Number(totalPages);
        const isCurrentPageWithinTwoPageNumbers =
            Math.abs(pageNumber - Number(currentPage)) <= 2;
        const active = pageNumber === Number(currentPage);

        if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
            isPageNumberOutOfRange = false;

            return (
                <li key={pageNumber}>
                    <button className={`${styles.itemPage} ${active && styles.active}`} onClick={() => handlePage(pageNumber)}>
                        {pageNumber}
                    </button>
                </li>
            );
        }

        if (!isPageNumberOutOfRange) {
            isPageNumberOutOfRange = true;

            return <li key={pageNumber}>
                <button className={`${styles.itemPage} ${'muted'}`}>{'...'}</button>
            </li>
        }

        return null;
    });

    return (
        <>
            {isPaginationShown && (
                <ul className={styles.pagination}>
                    <li>
                        <button className={styles.firstPage} onClick={() => handlePage()}
                            disabled={isCurrentPageFirst}>{'<<'}</button>
                    </li>

                    <li>
                        <button className={styles.prevPage} onClick={() => handlePage(Number(currentPage) - 1)}
                            disabled={isCurrentPageFirst}>{'<'}</button>
                    </li>
                    {pageNumbers}
                    <li>
                        <button className={styles.prevPage} onClick={() => handlePage(Number(currentPage) + 1)}
                            disabled={isCurrentPageLast}>{'>'}</button>
                    </li>
                    <li>
                        <button className={styles.lastPage} onClick={() => handlePage(Number(totalPages))}
                            disabled={isCurrentPageLast}>{'>>'}</button>
                    </li>
                </ul>
            )}
        </>
    );
};

export default PaginationComponent;