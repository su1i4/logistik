import { GoArrowSwitch } from "react-icons/go";

export const Switch = ({ setFilter, filter }: any) => {
  const handleChange = () => {
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      ByFrom: prevFilter.ByTo,
      ByTo: prevFilter.ByFrom,
    }));
  };

  return (
    <div
      onClick={handleChange}
      className="bg-blackRoot rounded-full p-1 mb-2 cursor-pointer md:mt-2"
    >
      <GoArrowSwitch className="text-white text-lg md:rotate-90 " />
    </div>
  );
};
