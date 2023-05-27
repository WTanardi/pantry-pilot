"use client";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsServices from "@/components/ProductsServices";
import Testimonials from "@/components/Testimonials";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      if (session.data.user.isAdmin) {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    }
  });
  return (
    <>
      <Header />
      <div className="container 2xl:max-w-7xl mx-auto">
        <Hero />
        <ProductsServices />
        <AboutUs />
        <Testimonials />
      </div>
      <Footer />
    </>
  );
}
