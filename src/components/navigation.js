import {NavLink} from "react-router-dom";
import React from "react"

export default function Navigation() {
  const navItems = [
    {
      name: "leaderboard",
      path: "/",
    },
    {
      name: "global top",
      path: "/global-top",
    },
    {
      name: "diagrams",
      path: "/diagrams",
    },
  ]

  return (
    <nav className="nav-wrapper">
      {
        navItems.map((item, index) => (
          <NavLink to={item.path} key={index} className={({isActive}) => (isActive ? "nav-item-active" : "nav-item")}>
            {item.name}
          </NavLink>
        ))
      }
    </nav>
  )
}