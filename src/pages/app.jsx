import { Outlet } from "react-router-dom";

// This component will serve as the outlet for diffrent routes

export default function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
