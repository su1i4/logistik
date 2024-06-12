import clsx from "clsx";
import { differenceInDays, endOfMonth, startOfMonth } from "date-fns";
import { useState } from "react";

const typeMonth = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const typeYear = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
const typeWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

interface MiniCalendarProps {
  newDate: Date;
  setNewDate: (newDate: Date) => void;
}

export const MiniCalendar = ({
  newDate,
  setNewDate,
}: MiniCalendarProps): JSX.Element => {
  newDate = newDate || new Date()
  const startOfDay = startOfMonth(newDate);
  const endOfDay = endOfMonth(newDate);
  const numDays = differenceInDays(endOfDay, startOfDay) + 1;

  const prefixDays = (startOfDay.getDay() + 6) % 7;
  const sufixDays = (6 - endOfDay.getDay() + 1) % 7;

  const [isShowMonth, setShowMonth] = useState(false);
  const [isShowYear, setShowYear] = useState(false);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    newDate.getMonth()
  );
  const [selectedYear, setSelectedYear] = useState(newDate.getFullYear());

  const handleMonthChange = (index: number) => {
    setSelectedMonthIndex(index);
    const updatedDate = new Date(selectedYear, index, 1);
    setNewDate(updatedDate);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(parseInt(year, 10));
    const updatedDate = new Date(parseInt(year, 10), selectedMonthIndex, 1);
    setNewDate(updatedDate);
  };

  function isTodayOrThisDate(date: Date) {
    return (
      date.getDate() === newDate.getDate() &&
      date.getMonth() === newDate.getMonth() &&
      date.getFullYear() === newDate.getFullYear()
    );
  }

  return (
    <div className="w-full min-w-[200px] h-[260px] p-2 bg-gray-50">
      <div className="flex items-center justify-between gap-1 border-b px-3">
        <div
          role="button"
          className="min-w-[200px] flex items-center justify-start gap-1 relative cursor-pointer"
          onClick={() => setShowMonth(!isShowMonth)}
        >
          <h1 className="text-black font-sans text-lg leading-10 font-light">
            {typeMonth[newDate.getMonth()]}
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
          {isShowMonth && (
            <div className="w-[170px] h-[202px] bg-white rounded-2xl absolute top-[50px] left-[-20px] grid grid-cols-2 gap-1 p-1 shadow">
              {typeMonth.map((item, index) => (
                <div
                  role="button"
                  onClick={() => handleMonthChange(index)}
                  key={index}
                  className="px-2 py-1 hover:bg-[#eeeff3] rounded-xl flex items-center justify-center cursor-pointer text-sm"
                >
                  {item.slice(0, 3)}
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          role="button"
          onClick={() => setShowYear(!isShowYear)}
          className="w-full flex items-center justify-start cursor-pointer gap-1 relative"
        >
          <h1 className="text-black font-sans text-lg leading-10 font-light">
            {newDate.getFullYear()}
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
          {isShowYear && (
            <div className="w-[80px] h-[200px] bg-white rounded-xl absolute top-[50px] right-0 flex flex-col items-center justify-center p-1 shadow">
              {typeYear.map((item) => (
                <div
                  role="button"
                  key={item}
                  onClick={() => handleYearChange(item)}
                  className="w-full px-2 py-1 hover:bg-[#eeeff3] rounded-md flex items-center justify-center cursor-pointer text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 pt-2">
        {typeWeek.map((item: string) => (
          <span
            key={item}
            className="w-6 h-6 text-center font-sans text-[10px] font-semibold leading-4 text-[#AFAFAF]"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 z-10">
        {Array.from({ length: prefixDays }).map((_, index) => {
          return <div key={index}></div>;
        })}
        {Array.from({ length: numDays }).map((_, index) => {
          const day = index + 1;
          const currentDate = new Date(
            newDate.getFullYear(),
            newDate.getMonth(),
            day
          );
          return (
            <div
              role="button"
              className={clsx(
                "w-7 h-7 flex flex-col items-center justify-center text-center font-sans text-sm text-black cursor-pointer hover:bg-[#d0d8e4] hover:text-black rounded-full",
                {
                  "!text-red-500":
                    currentDate.getDay() === 0 || currentDate.getDay() === 6,
                },
                {
                  "bg-[#d0d8e4]": isTodayOrThisDate(currentDate),
                }
              )}
              key={day}
              onClick={() => setNewDate(currentDate)}
            >
              {day}
            </div>
          );
        })}
        {Array.from({ length: sufixDays }).map((_, index) => {
          return <div key={index}></div>;
        })}
      </div>
    </div>
  );
};
