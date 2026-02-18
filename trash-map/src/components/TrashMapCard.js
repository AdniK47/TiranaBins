 import React from "react";
import { THEME } from "../constants/theme";

const TrashMapCard = ({ name, latitude, longitude }) => {
  const styles = {
    card: {
      backgroundColor: THEME.colors.white,
      padding: THEME.spacing.medium,
      borderRadius: "12px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
      margin: THEME.spacing.small,
      width: "250px",
      fontFamily: THEME.fonts.primary,
    },
    title: {
      fontWeight: "700",
      fontSize: "18px",
      marginBottom: "8px",
    },
    info: {
      fontSize: "14px",
      color: THEME.colors.darkText,
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>{name}</div>
      <div style={styles.info}>Latitude: {latitude}</div>
      <div style={styles.info}>Longitude: {longitude}</div>
    </div>
  );
};

export default TrashMapCard;