import { Link } from "react-router-dom";

export default function NotFound() {
  return (<div>
    <h1>404 Page Not Found</h1>
    <Link to="/profile">Return To Main Content</Link>
  </div>);
}
