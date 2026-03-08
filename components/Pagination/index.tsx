import React from 'react';
import * as Styled from './styled';

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getVisiblePages = (currentPage: number, totalPages: number): (number | 'dots')[] => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'dots')[] = [];

  // If current page is near the start
  if (currentPage <= 3) {
    pages.push(1, 2, 3);
    pages.push('dots');
    pages.push(totalPages - 1, totalPages);
    return pages;
  }

  // If current page is near the end
  if (currentPage >= totalPages - 2) {
    pages.push(1, 2);
    pages.push('dots');
    pages.push(totalPages - 2, totalPages - 1, totalPages);
    return pages;
  }

  // Current page is in the middle
  pages.push(1, 2);
  pages.push('dots');
  pages.push(currentPage);
  pages.push('dots');
  pages.push(totalPages - 1, totalPages);
  return pages;
};

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <Styled.PaginationContainer>
      <Styled.ArrowButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </Styled.ArrowButton>
      {visiblePages.map((page, index) =>
        page === 'dots' ? (
          <Styled.Dots key={`dots-${index}`}>...</Styled.Dots>
        ) : (
          <Styled.PageButton
            key={page}
            $active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Styled.PageButton>
        )
      )}
      <Styled.ArrowButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </Styled.ArrowButton>
    </Styled.PaginationContainer>
  );
};

export default Pagination;
