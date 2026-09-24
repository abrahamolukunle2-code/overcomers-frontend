import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Faint full-page background photo, matching the login page */}
      <Image
        src="/student-photo.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <main className="flex flex-1 items-center justify-center px-6 py-16">
          <SignupForm />
        </main>

        <Footer />
      </div>
    </div>
  );
}
