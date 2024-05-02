import React from "react";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ active }) {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <button
        className={`sidebar-el ${active == 1 ? "active" : ""}`}
        onClick={() => {
          navigate("/today");
        }}
      >
        Today
      </button>
      <button
        className={`sidebar-el ${active == 2 ? "active" : ""}`}
        onClick={() => {
          navigate("/inbox");
        }}
      >
        Inbox
      </button>
      <button
        className={`sidebar-el ${active == 3 ? "active" : ""}`}
        onClick={() => {
          navigate("/completed");
        }}
      >
        Completed
      </button>
    </div>
  );
}
