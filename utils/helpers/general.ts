interface AnyObject {
    [key: string]: any;
  }

export const clearEmptyProps = (object: AnyObject): AnyObject => {
  const returnedObject: AnyObject = {};
  Object.keys(object).forEach((key: string) => {
    if (object[key]) {
      returnedObject[key] = object[key];
    }
  });

  return returnedObject;
};


export const TYPES_CARS: AnyObject = {
  allCar: 'Все',
  popularCar: 'Популярные'
}

export const  FormatDateToRussian = (dateStr: string): string =>  {
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${day} ${month} ${year} года`;
}

export const FilterInputStyles = {
  label: "text-white dark:text-white white", 
  // input: [
  //   "bg-transparent",
  //   "text-black/90 dark:text-white/90",
  //   "placeholder:text-default-700/50 dark:placeholder:text-white/60",
  // ],
  // innerWrapper: "bg-transparent",
  // inputWrapper: [
  //   "shadow-xl",
  //   "bg-default-200/50",
  //   "dark:bg-default/60",
  //   "backdrop-blur-xl",
  //   "backdrop-saturate-200",
  //   "hover:bg-default-200/70",
  //   "focus-within:!bg-default-200/50",
  //   "dark:hover:bg-default/70",
  //   "dark:focus-within:!bg-default/60",
  //   "!cursor-text",
  // ],
};