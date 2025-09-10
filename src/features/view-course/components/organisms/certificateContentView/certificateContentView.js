import React, { useContext } from "react";

import styles from "./certificateContentView.module.css";
import FollowMouseBox from "@/features/create-course/components/organisms/followMouseBox/followMouseBox";
import ContentComponent from "../contentComponent/contentComponent";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import { ViewCourseContext } from "@/features/view-course/stores/ViewCourseContextProvider";

export default function CertificateContentView() {
  const { checkCertificate } = useContext(ViewCourseContext);



  const handleGetCertificate = () => {
    checkCertificate();
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h1>Obtener Certificado</h1>
        </div>
        <div className={styles.textContent}>Estas a punto de obtener tu certificado</div>
      </div>
      <div className={styles.contentCreator}>
        <div className={styles.certificateButton}>
          <ButtonPrimary label="Obtener" onClick={handleGetCertificate}></ButtonPrimary>
        </div>

        <FollowMouseBox>{/* TODO */}</FollowMouseBox>
      </div>
    </>
  );
}
