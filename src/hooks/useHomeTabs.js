import { useContext, useState } from "react";

import SectionHome from "@/components/organisms/sectionHome/sectionHome";
import SectionCreatedByMy from "@/components/organisms/sectionCreatedByMy/sectionCreatedByMy";

import { TabsType } from "@/enums/TabsType";
import { isLoggedIn } from "@/utils/login";

export const useHomeTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = [
    {
      label: "Inicio",
      dataSection: TabsType.COURSES_IN_PROGRESS,
      component: SectionHome,
      onClick: (i) => {
        setActiveIndex(i);
      },
      show: true,
    },
    {
      label: "Creados por mi",
      dataSection: TabsType.COURSES_CREATED_BY_ME,
      component: SectionCreatedByMy,
      onClick: (i) => {
        setActiveIndex(i);
      },
      show: isLoggedIn(),
    },
  ];

  return { tabs, activeIndex };
};
