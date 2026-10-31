import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// The image shown when the site is shared: ink background, "AHMAD●" and the role.
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background: "radial-gradient(circle at 78% 40%, #15131B 0%, #0B0A0F 60%)",
        color: "#F6F1EA",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", fontSize: 150, fontWeight: 800, letterSpacing: -6 }}>
        {site.wordmark}
        <div
          style={{ width: 28, height: 28, borderRadius: 999, background: "#FF6B35", marginLeft: 10, marginBottom: 30 }}
        />
      </div>
      <div style={{ fontSize: 44, color: "#9C94A3", marginTop: 12 }}>{site.role}</div>
    </div>,
    size,
  );
}
