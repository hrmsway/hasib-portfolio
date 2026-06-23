import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#050505",
        borderRadius: 96,
      }}
    >
      <svg width="320" height="320" viewBox="0 0 24 24" fill="none">
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
