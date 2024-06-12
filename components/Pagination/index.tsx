import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageLinks = () => {
    const pageLinks = [];

    for (let page = 1; page <= totalPages; page++) {
      pageLinks.push(
        <button
          key={page}
          className={`mx-1 w-10 h-10 rounded-full ${
            page === currentPage
              ? "bg-[#4da435] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      );
    }

    return pageLinks;
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="mx-1 p-1 px-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowAltCircleLeft
          className={`text-2xl ${currentPage !== 1 && "text-[#4da435]"}`}
        />
      </button>
      {renderPageLinks()}
      <button
        className="mx-1 p-1 px-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaArrowAltCircleRight
          className={`text-2xl ${currentPage !== totalPages && "text-[#4da435]"}`}
        />
      </button>
    </div>
  );
};
