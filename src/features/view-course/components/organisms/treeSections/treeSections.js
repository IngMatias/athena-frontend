import { motion, AnimatePresence } from "framer-motion";
import CardSection from "../../molecules/cardSection/cardSections";

import styles from "./treeSections.module.css";

export default function TreeSections({
  sections,
  openedSections,
  onToggleCollapse,
}) {
  return (
    <div className={styles.treeSectionCard}>
      {sections && sections.length > 0 && (
        <div className={styles.sectionsContainer}>
          <AnimatePresence>
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <CardSection
                  section={section}
                  openedSections={openedSections}
                  onToggleCollapse={onToggleCollapse}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
