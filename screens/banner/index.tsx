import TruckImage from "@/public/images/TruckBackground.jpg";

export const Banner = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${TruckImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative w-full h-[50vh] p-8"
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <h1 className="relative z-10 text-white text-3xl font-[400] font-mono">
        Надежная транспортная компания <br /> в Бишкеке, Кыргызстан -
        эффективные <br /> логистические решения для ваших грузоперевозок
      </h1>
    </section>
  );
};
