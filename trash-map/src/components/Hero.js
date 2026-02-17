 import React from "react";

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
      fontFamily: "Arial, Helvetica, sans-serif",
    },
    overlay: {
      backgroundColor: "rgba(20, 90, 50, 0.85)",
      padding: "60px 80px",
      borderRadius: "20px",
      textAlign: "center",
      color: "white",
      boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    },
    title: {
      fontSize: "64px",
      fontWeight: "800",
      marginBottom: "20px",
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