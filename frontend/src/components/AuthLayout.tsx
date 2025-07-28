import { Outlet } from "react-router-dom";
import "../styles/AuthLayout.css";

export default function AuthLayout() {
  return(<div className="auth-body">
    <section className="auth-center">
      <Outlet />      
    </section>
  </div>);
}
