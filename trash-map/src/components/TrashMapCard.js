 import React from "react";

const TrashMapCard = ({ name, latitude, longitude }) => {
  const styles = {
    card: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
      margin: "10px",
      width: "250px",
      fontFamily: "Arial, Helvetica, sans-serif",
    },
    title: {
      fontWeight: "700",
      fontSize: "18px",
      marginBottom: "8px",
    },
    info: {
      fontSize: "14px",
      color: "#555",
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