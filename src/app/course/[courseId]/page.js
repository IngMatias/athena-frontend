"use client";

import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import TreeSections from "@/features/view-course/components/organisms/treeSections/treeSections";
import { useViewCoursePath } from "@/features/view-course/hooks/useViewCoursePath";
import { ViewCourseContext } from "@/features/view-course/stores/ViewCourseContextProvider";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext } from "react";
import styles from "./styles.module.css";
import ButtonLink from "@/components/atoms/buttonLink/buttonLink";

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

  const { visitSection, prev } = useViewCoursePath();

  
  const handlePrevious = () => {
    prev();
  };


  const handleContinue = () => {
    visitSection({ sectionId: firstLeaf.id });
  };

  return (
    <div className="section">
      <div className={styles.courseInfoPage}>
        <div className={styles.courseBanner}
        >
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Imagen"
              fill
              priority
              className={styles.courseBannerImage}
            />
          )}
        </div>
        <div className={styles.courseContent}>
          <h1>{title}</h1>

          <div className={styles.courseInfo}>
            <div className={styles.sectionsInfo}>
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
            </div>
          </div>
        </div>
        <div className="section-actions">

        </div>

        <div className="section-actions">
          <div>
            <ButtonLink onClick={handlePrevious} label="Anterior" />
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
