import "./navbar.css"
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className={"navbar-container"}>
                <nav className={"navbar"}>
                    <Link className={"heading"} to={"/"}>
                        <h3 className={"title"}>MindShield</h3>
                    </Link>


                    <Link to={"/login"} className={"link"}>LOGIN</Link>
                </nav>
            </div>
            <div className={"fade-navbar-effect"}></div>
            <div className={"empty-navbar"}></div>
        </>
    );
};

export default Navbar;