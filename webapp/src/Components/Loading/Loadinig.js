import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ size = 100, color = "#007bff", backgroundColor = "transparent", borderRadius = "50%" }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Spinner
        style={{
          width: size,
          height: size,
          color: color,
          position: "relative",
          zIndex: 1
        }}
        animation="border"
      />
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `linear-gradient(to bottom right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0))`,
          transform: "rotate(45deg)",
          animation: "shine 1s infinite"
        }}
      />
    </div>
  );
}

export default Loading;
