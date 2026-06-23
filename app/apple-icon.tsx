import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#050505",
      }}
    >
      <svg width="110" height="110" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 1.5v21M1.5 12h21M4.6 4.6l14.8 14.8M19.4 4.6L4.6 19.4"
          stroke="#cecafb"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </div>,
    size
  );
}
