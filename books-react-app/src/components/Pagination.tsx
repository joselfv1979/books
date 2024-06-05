import { useAppSelector } from "hooks/redux-hooks";
import { Dispatch, SetStateAction } from "react";
import Pagination from "react-bootstrap/Pagination";

type Props = {
    setQuery: Dispatch<SetStateAction<{ search?: string; page: number }>>
}

const PaginationComponent = ({ setQuery }: Props) => {

    const { totalPages, currentPage } = useAppSelector((state) => state.book);

    const isPaginationShown = Number(totalPages) > 1;
    const isCurrentPageFirst = Number(currentPage) === 1;
    const isCurrentPageLast = Number(currentPage) === Number(totalPages);

    const handlePage = (page = 1) => {
        let nextPage: number;

        if (page < 1) {
            nextPage = 1;
        } else if (page > Number(totalPages)) {
            nextPage = Number(totalPages);
        } else {
            nextPage = page
        }

        setQuery((prevState) => ({ ...prevState, page: nextPage }));
    }

    let isPageNumberOutOfRange: boolean;

    const pageNumbers = [...new Array(Number(totalPages))].map((_, index) => {
        const pageNumber = index + 1;
        const isPageNumberFirst = pageNumber === 1;
        const isPageNumberLast = pageNumber === Number(totalPages);
        const isCurrentPageWithinTwoPageNumbers =
            Math.abs(pageNumber - Number(currentPage)) <= 2;

        if (
            isPageNumberFirst ||
            isPageNumberLast ||
            isCurrentPageWithinTwoPageNumbers
        ) {
            isPageNumberOutOfRange = false;
            return (
                <Pagination.Item
                    key={pageNumber}
                    onClick={() => handlePage(pageNumber)}
                    active={pageNumber === Number(currentPage)}
                >
                    {pageNumber}
                </Pagination.Item>
            );
        }

        if (!isPageNumberOutOfRange) {
            isPageNumberOutOfRange = true;
            return <Pagination.Ellipsis key={pageNumber} className="muted" />;
        }

        return null;
    });

    return (
        <>
            {isPaginationShown && (
                <Pagination className='px-5 mx-5 mt-3 gap-1'>
                    <Pagination.First
                        onClick={() => handlePage()}
                        disabled={isCurrentPageFirst} />
                    <Pagination.Prev
                        onClick={() => handlePage(Number(currentPage) - 1)}
                        disabled={isCurrentPageFirst}
                    />
                    {pageNumbers}
                    <Pagination.Next
                        onClick={() => handlePage(Number(currentPage) + 1)}
                        disabled={isCurrentPageLast}
                    />
                    <Pagination.Last
                        onClick={() => handlePage(Number(totalPages))}
                        disabled={isCurrentPageLast} />
                </Pagination>
            )}
        </>
    );
};

export default PaginationComponent;