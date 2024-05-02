import React, { useEffect } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_API_URL;
function Appbar() {
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get(`${backendUrl}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
