import React from "react";

import NavbarMenu from "./components/Navbar/Navbar.js";
import Sidebar from "./components/Sidebar/Sidebar.js";

import './menus.scss';

const Menus = () => {
	return [<Sidebar key={1} />, <NavbarMenu key={2} />];
};

export default Menus;