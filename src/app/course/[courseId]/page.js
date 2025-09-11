"use client";

import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import TreeSections from "@/features/view-course/components/organisms/treeSections/treeSections";
import { useViewCoursePath } from "@/features/view-course/hooks/useViewCoursePath";
import { ViewCourseContext } from "@/features/view-course/stores/ViewCourseContextProvider";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext } from "react";
import styles from "./styles.module.css";

export default function Home() {
  const params = useParams();
  const { courseId } = params;

  const {
    title,
    description,
    imagePreview,
    tags,
    enrolled,
    handleEnroll,
    sections,
    firstLeaf,
    openedSections,
    toggleSectionOpen,
  } = useContext(ViewCourseContext);

  const { visitSection } = useViewCoursePath();


  const handleContinue = () => {
    visitSection({ sectionId: firstLeaf.id });
  };

  return (
    <div className="section">
      <div
        style={{ position: "relative", width: "20rem", aspectRatio: "16/9" }}
      >
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Imagen"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
            unoptimized
          />
        )}
      </div>

      <h1>{title}</h1>

      <div style={{ display: "grid", gridTemplateColumns: "60% 40%" }}>
        <div>
          <TreeSections
            sections={sections}
            openedSections={openedSections}
            onToggleCollapse={toggleSectionOpen}
          />
        </div>

        <div className={styles.description}>
          <div className={styles.subtitle} >Resumen</div>
          <div>{description}</div>

          <div className={styles.subtitle}>Habilidades que obtendrás</div>
          <div className={styles.tags}>{tags.map((t) => (
            <div key={t.id} className={styles.tag}>
              {t.label}
            </div>
          ))}</div>

          <div>
            {!enrolled && (
              <ButtonPrimary label="Enroll Course" onClick={handleEnroll} />
            )}
            {enrolled && (
              <ButtonPrimary label="Continue Course" onClick={handleContinue} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
