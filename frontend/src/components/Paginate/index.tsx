import React, { FC } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

type TProps = {
  // page: number;
  totalPages: number;
  url: string;
  onClick(): Promise<void>;
}

const Paginate: FC<TProps> = ({ totalPages, url: rootUrl, onClick }) => {

  const state = useSelector<TRootReducers, TRootReducers>(state => state);

  const history = useHistory();

  const currentPage = state.page.current_page;

  const url = async (page: number) => {
    await onClick();
    const toUrl = `${rootUrl}?page=${page}`;
    history.push(toUrl);
  };

  const pages = () => {
    let start = 0;
    let end = totalPages < 5 ? totalPages : 5;
    let pages = [];

    if (currentPage > 3 && totalPages > 5) {
      start = ((totalPages - 3) < currentPage) ? totalPages - 5 : currentPage - 3;
    }

    if (totalPages > 5) {
      end = start + 5;
    }

    for (let i = start; i < end; i++) {
      pages.push(i + 1);
    }


    return pages;
  };

  return (
    <Pagination className="d-flex justify-content-center" aria-label="Page navigation">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink first onClick={() => url(1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous onClick={() => url(currentPage - 1)} />
      </PaginationItem>
      {pages().map((page) => (
        <PaginationItem key={page} active={currentPage === page}>
          <PaginationLink onClick={() => url(page)} >{ page }</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={totalPages === 0 || currentPage === totalPages}>
        <PaginationLink next onClick={() => url(currentPage + 1)} />
      </PaginationItem>
      <PaginationItem disabled={totalPages === 0 || currentPage === totalPages}>
        <PaginationLink last onClick={() => url(totalPages)} />
      </PaginationItem>
    </Pagination>
  );
};

export default Paginate;
