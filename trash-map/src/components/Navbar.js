 import React from "react";

const Navbar = () => {
  const styles = {
    navbar: {
      width: "100%",
      padding: "20px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(20, 90, 50, 0.95)",
      color: "white",
      fontFamily: "Arial, Helvetica, sans-serif",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
    },
    logo: {
      fontWeight: "bold",
      fontSize: "24px",
    },
    navLinks: {
      display: "flex",
      gap: "20px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontWeight: "500",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>TrashMap</div>
      <div style={styles.navLinks}>
        <a href="#home" style={styles.link}>Home</a>
        <a href="#map" style={styles.link}>Map</a>
        <a href="#about" style={styles.link}>About</a>
      </div>
    </nav>
  );
};

export default Navbar;