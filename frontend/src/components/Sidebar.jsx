import React from "react";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-el active">Today</div>
      <div className="sidebar-el">Inbox</div>
    </div>
  );
}
