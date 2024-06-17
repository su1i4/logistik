interface AnyObject {
  [key: string]: any;
}

export const clearEmptyProps = (object: AnyObject): AnyObject => {
  const returnedObject: AnyObject = {};
  Object.keys(object).forEach((key: string) => {
    const value = object[key];
    if (value) {
      if (value instanceof Date) {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, "0");
        const day = String(value.getDate()).padStart(2, "0");
        returnedObject[key] = `${year}-${month}-${day}`;
      } else {
        returnedObject[key] = value;
      }
    }
  });

  return returnedObject;
};

export const arrayToCommaSeparatedString = (array: any) => {
  if (Array.isArray(array)) {
    return array.join(",");
  }
  return "";
};

export const TYPES_CARS: AnyObject = {
  allCar: "Все",
  popularCar: "Популярные",
};

export const FormatDateToRussian = (dateStr: string): string => {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${day} ${month} ${year} г`;
};

export const PAGE_SIZES = [5, 10, 15, 20];

export const stylesInput = {
  input: [
    "bg-gray-100 hover:bg-gray-200 transition-all duration-200 active:bg-gray-100 focus:bg-gray-100"
  ],
  innerWrapper: ["bg-gray-100"],
  inputWrapper: [
    "bg-gray-100"]
  }

