import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      <div
        style={{
          fontSize: 76,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          display: "flex",
        }}
      >
        {siteConfig.name}
      </div>
      <div style={{ fontSize: 30, color: "#d4a95e", display: "flex" }}>
        Hairstylist &amp; Barber in Kassel
      </div>
    </div>,
    { ...size },
  );
}
