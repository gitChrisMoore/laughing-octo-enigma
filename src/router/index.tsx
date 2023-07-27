import Loader from "../components/Loader/SimpleCircular";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";

export default function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Auto redirect root to /home */}
        <Route path="/" element={<Navigate to="/generator-trend" replace />} />
        {routes.map(({ id, component, path }) => (
          <Route key={id} element={component} path={path} />
        ))}
      </Routes>
    </Suspense>
  );
}
