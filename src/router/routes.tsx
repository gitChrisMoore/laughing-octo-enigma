// import { lazy } from "react";

// Hatch
import RailsConversation from "../views/Hatch/ConvoFramework/RailsConversation";
import AdvisorCEO from "../views/Hatch/Conversation/AdvisorCEO";
// Sprout
import ObjectiveOverview from "../views/Sprout/Objective/ObjectiveOverview";
import BlueprintOverview from "../views/Sprout/Blueprint/BlueprintOverview";

// Admin
import AdminOverview from "../views/Admin/AdminOverview";

export const routes = [
  ,
  {
    id: "admin-overview",
    component: <AdminOverview />,
    path: "/admin-overview",
  },

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
  {
    id: "rails-conversation",
    component: <RailsConversation />,
    path: "/rails-conversation",
  },
  {
    id: "advisor-ceo",
    component: <AdvisorCEO />,
    path: "/advisor-ceo",
  },
];
