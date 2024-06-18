import CargoIdPage from "@/screens/CargoIdPage";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { cargoId: string };
}): Promise<Metadata> {
  const cargoId = params.cargoId;
  const cargoData = await fetch(
    `https://backend.logistickg.com/cargo/${cargoId}`
  ).then((res) => res.json());

  return {
    title: cargoData.productName || "Детали груза",
    description: cargoData.ByComment || "Детальный обзор груза",
    keywords:
      "грузоперевозки, логистика, доставка грузов, транспортные услуги, Logistic KG, логистические услуги, перевозка грузов",
  };
}

export default function Cargo({ params }: { params: { cargoId: string } }) {
  return <CargoIdPage params={params} />;
}
