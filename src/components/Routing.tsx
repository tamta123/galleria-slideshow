import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Detail = lazy(() => import("../pages/Detail"));

const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={"loading..."}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/Detail/:artistId"
        element={
          <Suspense fallback={"loading..."}>
            <Detail />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routing;
