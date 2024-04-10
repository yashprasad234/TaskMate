import React, { useEffect } from "react";
import axios from "axios";
const backendUrl = "http://localhost:3000/api";

/**
 * Functional component representing the application's app bar.
 * It fetches user information upon component mount.
 * @returns {JSX.Element} JSX representation of the component.
 */
function Appbar() {
  const token = localStorage.getItem("token");

  // Effect to fetch user information upon component mount
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get(`${backendUrl}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Process the response here if needed
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchMe();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
      }}
    >
      {/* Application title */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          fontFamily: `'Tektur', sans-serif`,
          fontSize: "4rem",
          fontWeight: "900",
          letterSpacing: "0.8rem",
        }}
      >
        TODO
      </div>
    </div>
  );
}

export default Appbar;
