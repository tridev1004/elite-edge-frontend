import React, { useEffect } from "react";

const SenjaWidget = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.src = "https://widget.senja.io/widget/273465e9-15fb-47d5-8fca-23da7683f639/platform.js";
    script.type = "text/javascript";
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>What Our Customers Say</h2>
      <div
        className="senja-embed"
        data-id="273465e9-15fb-47d5-8fca-23da7683f639"
        data-mode="shadow"
        data-lazyload="false"
        style={styles.widget}
      />
    </div>
  );
};

// Inline styling for professional appearance
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f9f9f9", // Light gray background
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333", // Dark gray text
    textAlign: "center",
    marginBottom: "20px",
  },
  widget: {
    width: "100%",
    maxWidth: "1200px", // Limit the width for large screens
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for better appearance
    borderRadius: "8px", // Rounded corners
    overflow: "hidden", // Ensure the content fits within the borders
  },
};

export default SenjaWidget;
