import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

export default function CardSkeleton() {
  return (
    <Card className="w-full space-y-5 p-4 bg-grayRoot h-[120px]" radius="lg">
      <div className="flex justify-between gap-4 md:flex-col">
        <Skeleton className="w-full md:w-2/5 h-fit rounded-lg bg-lightGray ">
          <div className="h-8 w-full md:h-2 rounded-lg bg-lightGray  "></div>
        </Skeleton>
        <Skeleton className="w-full h-fit rounded-lg bg-lightGray ">
          <div className="h-12 w-full md:h-2 rounded-lg bg-lightGray "></div>
        </Skeleton>
        <Skeleton className="w-full h-fit rounded-lg bg-lightGray ">
          <div className="h-8 w-full md:h-2 rounded-lg bg-lightGray "></div>
        </Skeleton>
        <Skeleton className="w-fulls h-fit rounded-lg bg-lightGray ">  
          <div className="h-5 w-full rounded-lg bg-lightGray "></div>
        </Skeleton>
        <Skeleton className="w-full h-fit rounded-lg bg-lightGray ">
          <div className="h-10 w-full rounded-lg bg-lightGray "></div>
        </Skeleton>
        <Skeleton className="w-full h-fit rounded-lg bg-lightGray ">  
          <div className="h-24 w-full rounded-lg bg-lightGray "></div>
        </Skeleton>
      </div>
    </Card>
  );
}
