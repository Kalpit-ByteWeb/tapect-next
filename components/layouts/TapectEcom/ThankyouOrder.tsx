'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { Image } from "@/libs/Index"; // Adjust this path as per your Next.js structure

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const ThankyouOrder: React.FC<ModalProps> = ({ show, onClose }) => {
  const router = useRouter();

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="bg-white rounded-16 p-12 md:w-[730px] w-full text-center items-center space-y-6">
        <Image
          src="/Icons/ThankyouPopupIcon.svg"
          alt="Thank you Popup"
          className="mx-auto"
        />
        <div className="space-y-4">
          <h2 className="TitleHeading">Thank you for your Order!</h2>
          <p className="Description">
            Your order has been placed. <br />
            We will be in touch and contact you soon.
          </p>
        </div>
        <button
          onClick={() => {
            onClose();
            sessionStorage.clear();
            router.push("/"); // navigate to homepage
          }}
          className="md:w-[539px] w-full mx-auto btn-primary py-4 rounded-[8px] text-[18px] font-semibold"
        >
          Back to Website
        </button>
      </div>
    </div>
  );
};

export default ThankyouOrder;
