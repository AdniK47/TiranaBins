 import React from "react";
import { THEME } from "../constants/theme";

const Navbar = () => {
  const styles = {
    navbar: {
      width: "100%",
      padding: `${THEME.spacing.medium} ${THEME.spacing.large}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: THEME.colors.primary,
      color: THEME.colors.white,
      fontFamily: THEME.fonts.primary,
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
      gap: THEME.spacing.medium,
    },
    link: {
      color: THEME.colors.white,
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