import React from "react";
import { BiSolidHome } from "react-icons/bi";
import { FaUser, FaListOl, FaAddressCard } from "react-icons/fa";
import { GiPresent } from "react-icons/gi";
import { TbSettingsPin } from "react-icons/tb";
import { GoReport } from "react-icons/go";

export const SidebarAdminData = [
  {
    title: "Home",
    path: "/admin/home",
    icon: <BiSolidHome />,
    className: "nav-list__item",
  },
  {
    title: "Rewards",
    path: "/admin/rewards",
    icon: <GiPresent />,
    className: "nav-list__item",
  },
  {
    title: "Lucky Number",
    path: "/admin/luckyNumber",
    icon: <TbSettingsPin />,
    className: "nav-list__item",
  },
  {
    title: "Top 10",
    path: "/admin/top10",
    icon: <FaListOl />,
    className: "nav-list__item",
  },
  {
    title: "Agents",
    path: "/admin/agents",
    icon: <FaUser />,
    className: "nav-list__item",
  },
  {
    title: "Agent And Terms",
    path: "/admin/list&term",
    icon: <FaAddressCard />,
    className: "nav-list__item",
  },
  {
    title: "Reports",
    path: "/admin/report",
    icon: <GoReport />,
    className: "nav-list__item",
  },
];
