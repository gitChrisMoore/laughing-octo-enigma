// import { lazy } from "react";

import AdminOverview from "../views/Admin/AdminOverview";
// import ChatMessageOverview from "../views/ChatMessage/ChatMessageOverview";
import GenericConvo from "../views/Conversation/Generic/GenericConvo";
import GenericConvoOverview from "../views/Conversation/Generic/GenericConvoOverview";
import GenericConvoSSE from "../views/Conversation/Generic/GenericConvoSSE";
import CompetitorOverview from "../views/Generator/Competitor/CompetitorOverview";
import ObstacleOverview from "../views/Generator/Obstacle/ObstacleOverview";
import PersonaOverview from "../views/Generator/Persona/PersonaOverview";
import TargetMarketOverview from "../views/Generator/TargetMarket/TargetMarketOverview";
import TrendOverview from "../views/Generator/Trend/TrendOverview";

import ProblemSolverCreate from "../views/ProblemSolvers/ProblemSolverCreate";
import ProblemSolverOverview from "../views/ProblemSolvers/ProblemSolverOverview";
// Sprout
import ObjectiveOverview from "../views/Sprout/Objective/ObjectiveOverview";
import BlueprintOverview from "../views/Sprout/Blueprint/BlueprintOverview";

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
  // {
  //   id: "genericconvo-sse",
  //   component: <GenericConvoSSE />,
  //   path: "/genericconvo-sse",
  // },
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
    id: "admin-overview",
    component: <AdminOverview />,
    path: "/admin-overview",
  },
  // {
  //   id: "chatmessage-overview",
  //   component: <ChatMessageOverview />,
  //   path: "/chatmessage-overview",
  // },
  {
    id: "objective-overview",
    component: <ObjectiveOverview />,
    path: "/objective-overview",
  },
  {
    id: "blueprint-overview",
    component: <BlueprintOverview />,
    path: "/blueprint-overview",
  },
];
