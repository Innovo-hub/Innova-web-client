import ContactForm from "../../Components/ContactForm";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
