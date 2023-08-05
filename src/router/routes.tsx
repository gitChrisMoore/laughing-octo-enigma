// import { lazy } from "react";

import GenericConvo from "../views/Conversation/Generic/GenericConvo";
import GenericConvoOverview from "../views/Conversation/Generic/GenericConvoOverview";
import GenericConvoSSE from "../views/Conversation/Generic/GenericConvoSSE";
import CompetitorOverview from "../views/Generator/Competitor/CompetitorOverview";
import ObstacleOverview from "../views/Generator/Obstacle/ObstacleOverview";
import PersonaOverview from "../views/Generator/Persona/PersonaOverview";
import TargetMarketOverview from "../views/Generator/TargetMarket/TargetMarketOverview";
import TrendOverview from "../views/Generator/Trend/TrendOverview";
import ProblemSolverFunctionOverview from "../views/ProblemSolverFunction/ProblemSolverFunctionOverview";
import ProblemSolverCreate from "../views/ProblemSolvers/ProblemSolverCreate";
import ProblemSolverOverview from "../views/ProblemSolvers/ProblemSolverOverview";

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
  {
    id: "generator-targetmarket",
    component: <TargetMarketOverview />,
    path: "/generator-targetmarket",
  },
  ,
  {
    id: "genericconvo",
    component: <GenericConvo />,
    path: "/genericconvo",
  },
  {
    id: "genericconvo-sse",
    component: <GenericConvoSSE />,
    path: "/genericconvo-sse",
  },
  {
    id: "genericconvo-overview",
    component: <GenericConvoOverview />,
    path: "/genericconvo-overview",
  },
  {
    id: "problem-solver-overview",
    component: <ProblemSolverOverview />,
    path: "/problem-solver-overview",
  },
  {
    id: "problem-solver-overview/create",
    component: <ProblemSolverCreate />,
    path: "/problem-solver-overview/create",
  },
  {
    id: "problem-solver-function-overview",
    component: <ProblemSolverFunctionOverview />,
    path: "/problem-solver-function-overview",
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
  {
    title: "targetmarket",
    to: "generator-targetmarket",
  },
  {
    title: "genericconvo",
    to: "genericconvo",
  },
  {
    title: "genericconvo-sse",
    to: "genericconvo-sse",
  },
  {
    title: "genericconvo-overview",
    to: "genericconvo-overview",
  },
  {
    title: "problem-solver-overview",
    to: "problem-solver-overview",
  },
  {
    title: "problem-solver-overview/create",
    to: "problem-solver-overview/create",
  },
  {
    title: "problem-solver-function-overview",
    to: "problem-solver-function-overview",
  },
];
