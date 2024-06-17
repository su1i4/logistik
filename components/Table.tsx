import { ReactNode } from "react";
import Pagination from "./Pagination";

export interface ITableData {
  [key: string]: string | number | object | null | undefined;
}

interface IColunms {
  label: string;
  accessKey?: string;
  action?: (data: ITableData) => ReactNode;
  childKey?: string;
}

interface IProps {
  columns: IColunms[];
  data: ITableData[];
  isLoading: boolean;
  currentPage: number | string;
  totalPages: number;
  onPageChange: (newPage: number | string) => void;
  onClickCard?: (data: ITableData) => void;
}

interface ITableCell {
  data: ITableData;
  key?: string;
  action?: (data: ITableData) => ReactNode;
  childKey?: string;
}

const TableCell = ({ data, key, action, childKey = "" }: ITableCell) => {
  if (!key) {
    return action?.(data);
  } else {
    const isObject = typeof data[key] === "object" && data[key] !== null;

    const content = isObject
      ? ((data[key] as ITableData)[childKey] as string)
      : (data[key] as string);

    return <h3 className="text-gray-200">{content}</h3>;
  }
};

const Table = (props: IProps) => {
  return (
    <>
      <section className="w-full px-3 mt-5">
        <div className="flex flex-col w-full">
          <div className="w-full overflow-auto">
            <div className="inline-block min-w-full py-2 align-middle ">
              <div className="w-full overflow-hidden border rounded-md border-[#3d3d3d] md:rounded-lg">
                <table className="w-full divide-y divide-[#3d3d3d]">
                  <thead className="bg-[#1c1c1c]">
                    <tr>
                      {props.columns.map((item: IColunms, index: number) => {
                        return (
                          <th
                            key={index + 1}
                            scope="col"
                            className="py-5 px-12 text-sm font-normal text-left rtl:text-right text-gray-400"
                          >
                            {item.label}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600 bg-[#27272a] !h-[80px]">
                    {props.data.map((item: ITableData, index: number) => {
                      return (
                        <tr key={index}>
                          {props.columns.map((el: IColunms, index: number) => {
                            return (
                              <td
                                onClick={() =>
                                  props.onClickCard && props.onClickCard(item)
                                }
                                key={index}
                                className="px-12 py-4 text-sm font-medium whitespace-nowrap"
                              >
                                {TableCell({
                                  data: item,
                                  key: el.accessKey,
                                  action: el.action,
                                  childKey: el.childKey,
                                })}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {props.totalPages ? (
        <Pagination
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          onPageChange={props.onPageChange}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Table;
