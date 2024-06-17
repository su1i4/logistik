import clsx from "clsx";

interface IPaginationProps {
  currentPage: number | string;
  totalPages: number;
  onPageChange: (newPage: number | string) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginationProps) => {
  if (totalPages <= 0) {
    return null;
  }

  const maxVisiblePages = 5;
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getPageNumbersToShow = () => {
    if (totalPages <= maxVisiblePages) {
      return pageNumbers;
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      const startPage = Math.min(
        Math.max(Number(currentPage) - half, 1),
        totalPages - maxVisiblePages + 1
      );
      const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

      const pageNumbersToShow: (string | number)[] = [];

      if (startPage > 2) {
        pageNumbersToShow.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbersToShow.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbersToShow.push("...");
      }

      pageNumbersToShow.push(totalPages);

      return pageNumbersToShow;
    }
  };

  return (
    <div className="flex items-center justify-between mt-6 mx-4">
      <div
        onClick={() => onPageChange(Number(currentPage) - 1)}
        className={`flex items-center px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-[#1c1c1c] border rounded-md gap-x-2 hover:bg-white/20 cursor-pointer ${
          currentPage === 1 ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Пред</span>
      </div>
      <div className="items-center flex gap-x-3">
        {getPageNumbersToShow().map(
          (pageNumber: number | string, index: number) => (
            <a
              key={index}
              href="#"
              onClick={() => {
                if (pageNumber !== "...") {
                  onPageChange(pageNumber);
                }
              }}
              className={clsx(
                "flex justify-center items-center w-[30px] h-[30px] mx-1 transition-colors duration-300 transform rounded-md hover:bg-white/20",
                { "bg-white text-black": pageNumber === currentPage },
                { "bg-[#1c1c1c] text-white": pageNumber !== currentPage }
              )}
            >
              {pageNumber}
            </a>
          )
        )}
      </div>
      <div
        onClick={() => onPageChange(Number(currentPage) + 1)}
        className={`flex items-center px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-[#1c1c1c] border rounded-md gap-x-2 hover:bg-white/20 cursor-pointer${
          currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <span>След</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default Pagination;
