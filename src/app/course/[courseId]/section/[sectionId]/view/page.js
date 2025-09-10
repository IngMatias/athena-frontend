"use client";

import DocumentChat from "@/features/create-course/components/organisms/documentChat/documentChat";
import SimpleChat from "@/features/create-course/components/organisms/simpleChat/simpleChat";
import TabPanel from "@/features/create-course/components/organisms/tabPanel/tabPanel";
import ContentView from "@/features/view-course/components/organisms/contentView/contentView";
import styles from "../styles.module.css";
import Breadcrumb from "@/features/create-course/components/molecules/breadcrumb/breadcrumb";
import { useContext } from "react";
import { useViewCoursePath } from "@/features/view-course/hooks/useViewCoursePath";
import { ViewCourseContext } from "@/features/view-course/stores/ViewCourseContextProvider";
import NavigatorSections from "@/features/view-course/components/organisms/navigatorSections/navigatorSections";
import CertificateContentView from "@/features/view-course/components/organisms/certificateContentView/certificateContentView";
import { useParams } from "next/navigation";
import { formatDateToDDMMAAAAA } from "@/utils/date";

export default function Page() {
  const { visitSection } = useViewCoursePath();

  const { sectionId } = useParams();

  const { enrolled, sections, path, openedSections, toggleSectionOpen } =
    useContext(ViewCourseContext);

  const handleSelectSection = (sectionId) => {
    visitSection({ sectionId });
  };

  return (
    <div className="section">
      <div>
        <div className={styles.content}>
          <div className={`${styles.panel} ${styles.leftPanel}`}>
            <TabPanel>
              <div>
                <div>Navigation</div>
                <div className={styles.sections}>
                  <NavigatorSections
                    sections={sections}
                    path={[]}
                    isRoot={true}
                    openedSections={openedSections}
                    onToggleCollapse={toggleSectionOpen}
                    onSelectSection={handleSelectSection}
                  />
                  { !enrolled?.completedAt && <button
                    className={styles.certificateSection}
                    onClick={() => handleSelectSection("get-certificate")}
                  >
                    Obtener Certificado
                  </button> }
                </div>
              </div>
            </TabPanel>
          </div>
          
          { enrolled?.completedAt && (<div className={styles.completedContainer}>
            Ya has completado este curso! El {formatDateToDDMMAAAAA(enrolled.completedAt)}. 
            <a className={styles.completedButton} onClick={handleSelectSection}>Volver al panel del curso.</a>
            </div>) }

          {!enrolled?.completedAt && sectionId == "get-certificate" ? (
            <CertificateContentView></CertificateContentView>
          ) : (
            <>
              <div className={styles.header}>
                <div className={styles.titleContainer}>
                  <h1>{path[path.length - 1]}</h1>
                </div>

                <div className={styles.breadcrumbContainer}>
                  <Breadcrumb path={path} />
                </div>
              </div>
              <ContentView />
            </>
          )}
          <div className={`${styles.panel} ${styles.rightPanel}`}>
            <TabPanel>
              <div>
                <div>Chat</div>
                <SimpleChat></SimpleChat>
              </div>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
