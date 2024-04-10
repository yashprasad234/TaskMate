import { Card } from "@mui/material";
import React from "react";
import "../styles/sidebar.css";

/**
 * Functional component representing the sidebar.
 * @returns {JSX.Element} JSX representation of the component.
 */
export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Today section */}
      <div className="sidebar-el active">Today</div>
      {/* Inbox section */}
      <div className="sidebar-el">Inbox</div>
    </div>
  );
}
