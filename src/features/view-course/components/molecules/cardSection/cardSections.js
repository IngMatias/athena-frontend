import { AnimatePresence, motion } from "framer-motion";
import TreeSectionCard from "../../organisms/treeSections/treeSections";
import ButtonCollapse from "@/features/create-course/components/atoms/buttonCollapse/buttonCollapse";

import styles from "./cardSection.module.css";

export default function CardSection({
  section,
  openedSections,
  onToggleCollapse,
}) {
  const isOpen = openedSections.includes(section.id);
  const isLeaf = !section.sections || section.sections.length === 0;

  return (
    <div
      className={
        styles.cardSection + (isOpen ? ` ${styles.cardOpenSection}` : "")
      }
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.cardBody}>
          {!isLeaf && (
            <div className={styles.buttonCollapseContainer}>
              <ButtonCollapse
                active={isOpen}
                onClick={() => onToggleCollapse(section.id)}
              />
            </div>
          )}
          <div
            className={`${styles.inputContainer} ${
              isLeaf ? styles.inputLeafContainer : ""
            } ${isOpen ? styles.inputOpenContainer : ""}`}
          >
            <button
              className={styles.input}
              onClick={() => onToggleCollapse(section.id)}
            >
              {section.title}
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key={section.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <AnimatePresence initial={false}>
                {section.sections && (
                  <div>
                    <TreeSectionCard
                      sections={section.sections}
                      openedSections={openedSections}
                      onToggleCollapse={onToggleCollapse}
                    />
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
