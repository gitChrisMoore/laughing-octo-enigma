import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import AdvisorCEO from "../views/Hatch/Conversation/AdvisorCEO";

export default function Router() {
  return (
    <Suspense fallback={<AdvisorCEO />}>
      <Routes>
        {/* Auto redirect root to /home */}
        <Route path="/" element={<Navigate to="/advisor-ceo" replace />} />
        {/*  @ts-ignore */}
        {routes.map(({ id, component, path }) => (
          <Route key={id} element={component} path={path} />
        ))}
      </Routes>
    </Suspense>
  );
}
