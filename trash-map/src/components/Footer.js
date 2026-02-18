 import React from "react";
import { THEME } from "../constants/theme";

const Footer = () => {
  const styles = {
    footer: {
      width: "100%",
      padding: THEME.spacing.medium,
      backgroundColor: THEME.colors.primary,
      color: THEME.colors.white,
      textAlign: "center",
      position: "fixed",
      bottom: 0,
      left: 0,
      fontFamily: THEME.fonts.primary,
    },
  };

  return (
    <footer style={styles.footer}>
      © 2026 TrashMap. All rights reserved.
    </footer>
  );
};

export default Footer;