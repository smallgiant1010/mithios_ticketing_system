import { Outlet } from "react-router-dom";
import "../styles/AuthLayout.css";

export default function AuthLayout() {
  return(<div className="auth-body">
    <h2 id="welcome-heading">Welcome To Mithios</h2>
    <section className="auth-center">
      <Outlet />      
    </section>
    <div className="role-tags">
      <div className="role-tag">
        <img 
          src="/images/brush.png" 
          className="role-image" 
          alt="icons from flaticon by Royyan Wijaya's User Interface pack"
          />
        <h4 className="role-heading">Artist</h4>
      </div>
      <div className="role-tag">
        <img 
          src="/images/code.png" 
          className="role-image" 
          alt="icons from flaticon by Royyan Wijaya's User Interface pack"
          />
        <h4 className="role-heading">Programmer</h4>
      </div>
      <div className="role-tag">
        <img 
          src="/images/user.png" 
          className="role-image" 
          alt="icons from flaticon by Royyan Wijaya's User Interface pack"
          />
        <h4 className="role-heading">Manager</h4>
      </div>
    </div>
  </div>);
}
