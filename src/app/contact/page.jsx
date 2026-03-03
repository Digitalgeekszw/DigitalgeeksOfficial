import React from "react";
import PageHero from "../../components/PageHero";
import ContactForm from "../../Contact";
import { Navbar, Footer } from "../../components";
import styles from "../../style";

export default function ContactPage() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <PageHero 
        title="Contact Us" 
        subtitle="Have a project in mind or just want to say hi? We'd love to hear from you." 
      />

      <div className={`bg-white text-black`}>
        {/* We reuse the existing Contact component */}
        <ContactForm />
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
