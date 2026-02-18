 import React from "react";
import { THEME } from "../constants/theme";

const Hero = () => {
  const styles = {
    page: {
      height: "100vh",
      width: "100vw",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1604187351574-c75ca79f5807')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: THEME.fonts.primary,
    },
    overlay: {
      backgroundColor: THEME.colors.primaryLight,
      padding: `${THEME.spacing.xlarge} 80px`,
      borderRadius: "20px",
      textAlign: "center",
      color: THEME.colors.white,
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    },
    title: {
      fontSize: "64px",
      fontWeight: "800",
      marginBottom: THEME.spacing.medium,
      letterSpacing: "2px",
    },
    subtitle: {
      fontSize: "22px",
      fontWeight: "400",
      maxWidth: "500px",
      lineHeight: "1.5",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>TrashMap</h1>
        <p style={styles.subtitle}>
          Gjeni kosha mbeturinash. Hidhni mbeturinat me përgjegjësi. Mbani qytetet të pastra.
        </p>
      </div>
    </div>
  );
};

export default Hero;