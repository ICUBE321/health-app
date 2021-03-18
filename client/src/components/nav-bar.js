
import React from "react";

import NavBar from "./navbar.component";
import AuthNav from "./auth-nav";

const MainNav = () => {
    return (
        <div className="nav-container mb-3">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container">
                    <div className="navbar-brand logo" />
                    <NavBar />
                    <AuthNav />
                </div>
            </nav>
        </div>
    );
};

export default MainNav;