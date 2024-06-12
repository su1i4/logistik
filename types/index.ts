import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface CargoCardType {
    cargoId: number
    startDate: string
    endDate: string
    ByFrom: {label: string, value: number}
    ByTo: {label: string, value: number}
    productName: string
    BySize: string
    ByWeight: string
    ByComment: string
    fromMap: any
    toMap: any
}

export interface CargoQueryParams {
  page: number;
  size: number;
}