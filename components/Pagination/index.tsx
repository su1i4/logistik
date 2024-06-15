import React from "react";
import {Pagination, PaginationItemType} from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { cn } from "@nextui-org/react";

export default function CustomPagination({totalPages, initialPage, handlePaginationChange}: any) {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: any) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button key={key} className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")} onClick={onNext}>
          <IoIosArrowBack className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button key={key} className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")} onClick={onPrevious}>
          <IoIosArrowBack />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button key={key} className={className}>...</button>;
    }

    // cursor is the default item
    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive &&
          "text-white bg-gradient-to-br from-gray-400 to-gray-700 font-bold",
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      disableCursorAnimation
      showControls
      total={totalPages}
      initialPage={initialPage}
      className="gap-2 text-white"
      radius="full"
      renderItem={renderItem}
      onChange={handlePaginationChange}
      variant="flat"
    />
  );
}
