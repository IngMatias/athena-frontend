"use client";

import ButtonLink from "@/components/atoms/buttonLink/buttonLink";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import ImageInput from "@/features/create-course/components/organisms/imageInput/imageInput";
import { useCreateCoursePath } from "@/features/create-course/hooks/useCreateCoursePath";
import { CourseContext } from "@/features/create-course/stores/CourseContextProvider";
import Image from "next/image";
import { useContext } from "react";

export default function CourseImage() {
  const { saveImage } = useContext(CourseContext);

  const { next, prev } = useCreateCoursePath();

  const handlePrevious = () => {
    prev();
  };

  const handleNext = () => {
    saveImage().then(() => {
      next();
    });
  };

  return (
    <div className="section">
      <div>
        <Image
          src="/brand/Owl.svg"
          width="200"
          height="256"
          alt="Owl"
          priority
        />

        <h1>Da vida a tu curso</h1>

        <div className="section-text">
          <p>Esta información será la carta de presentación de tu curso</p>
        </div>

        <div className="section-content">
          <ImageInput />
        </div>

        <div className="section-actions">
          <div>
            <ButtonLink onClick={handlePrevious} label="<- Home" />
            <ButtonPrimary onClick={handleNext} label="Siguiente" />
          </div>
        </div>
      </div>
    </div>
  );
}
