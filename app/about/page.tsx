import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import billy from "@/public/billy-portrait.webp";
import cakra from "@/public/cakra-portrait.webp";

const AboutPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="container mb-auto">
        <p className="text-6xl text-center font-bold pt-8 xl:pt-16">About Us</p>
        <div className="flex flex-col items-center text-center md:flex-row justify-evenly gap-8 py-8 xl:py-20">
          <div className="w-72 border-2 rounded-2xl shadow-xl">
            <Image
              src={billy}
              width={300}
              height={300}
              alt="Billy Portrait"
              className="w-full object-cover "
            />
            <div className="p-4 font-bold">
              <p className="text-3xl">William Tanardi</p>
              <p className="text-xl mt-2">082111633024</p>
            </div>
          </div>
          <div className="w-72 border-2 rounded-2xl shadow-xl">
            <Image
              src={cakra}
              width={300}
              height={300}
              alt="Cakra Portrait"
              className="w-full object-cover"
            />
            <div className="p-4 font-bold text-3xl">
              <p className="text-3xl">Cakra Kusuma Erlangga</p>
              <p className="text-xl mt-2">082111633081</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
