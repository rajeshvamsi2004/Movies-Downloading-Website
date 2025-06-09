import * as React from "react";

const scaleAnimation = `
  0% { transform: scaleY(1.0); }
  50% { transform: scaleY(0.4); }
  100% { transform: scaleY(1.0); }
`;

const SampleLoader = ({
  loading = true,
  color = "#000000",
  speedMultiplier = 1,
  height = 35,
  width = 4,
  radius = 2,
  margin = 2,
  styleOverride = {},
  ...props
}) => {
  if (!loading) return null;

  const wrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: `${margin}px`,
    ...styleOverride,
  };

  const barStyle = (i) => ({
    backgroundColor: color,
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${radius}px`,
    display: "inline-block",
    animation: `scaleAnim ${1 / speedMultiplier}s ${i * 0.1}s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)`,
    animationFillMode: "both",
  });

  return (
    <span style={wrapperStyle} {...props}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={barStyle(i)} />
      ))}
      <style>
        {`@keyframes scaleAnim { ${scaleAnimation} }`}
      </style>
    </span>
  );
};

export default SampleLoader;
