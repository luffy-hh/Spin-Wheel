import { TbSettingsPin } from "react-icons/tb";
import { GoReport } from "react-icons/go";

export const SidebarAgentsData = [
  {
    title: "Get Number",
    path: "/admin/getNumber",
    icon: <TbSettingsPin />,
    className: "nav-list__item",
  },
  {
    title: "Reports",
    path: "/admin/agReport",
    icon: <GoReport />,
    className: "nav-list__item",
  },
];
