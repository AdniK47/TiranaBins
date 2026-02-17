 import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      width: "100%",
      padding: "20px",
      backgroundColor: "rgba(20, 90, 50, 0.95)",
      color: "white",
      textAlign: "center",
      position: "fixed",
      bottom: 0,
      left: 0,
      fontFamily: "Arial, Helvetica, sans-serif",
    },
  };

  return (
    <footer style={styles.footer}>
      © 2026 TrashMap. All rights reserved.
    </footer>
  );
};

export default Footer;