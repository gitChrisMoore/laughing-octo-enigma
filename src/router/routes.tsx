// import { lazy } from "react";

import CompetitorOverview from "../views/Generator/Competitor/CompetitorOverview";
import ObstacleOverview from "../views/Generator/Obstacle/ObstacleOverview";
import PersonaOverview from "../views/Generator/Persona/PersonaOverview";
import TrendOverview from "../views/Generator/Trend/TrendOverview";

export const routes = [
  {
    id: "generator-obstacle",
    component: <ObstacleOverview />,
    path: "/generator-obstacle",
  },
  {
    id: "generator-competitor",
    component: <CompetitorOverview />,
    path: "/generator-competitor",
  },
  {
    id: "generator-trend",
    component: <TrendOverview />,
    path: "/generator-trend",
  },
  {
    id: "generator-persona",
    component: <PersonaOverview />,
    path: "/generator-persona",
  },
];

export const NavBarRoutes = [
  {
    title: "obstacle",
    to: "generator-obstacle",
  },
  {
    title: "competitor",
    to: "generator-competitor",
  },
  {
    title: "trend",
    to: "generator-trend",
  },
  {
    title: "persona",
    to: "generator-persona",
  },
];
