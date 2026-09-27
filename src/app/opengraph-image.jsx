import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "DigitalGeeks — Built for everyday progress. The company behind Swipee, ZimSensei and PreciAgro.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/digitalgeeks-wordmark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          color: "#0a0b0d",
        }}
      >
        <img src={logoSrc} alt="DigitalGeeks" width={291} height={80} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.02 }}>
            Built for everyday progress.
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#5b6472" }}>
            Swipee · ZimSensei · PreciAgro
          </div>
        </div>
      </div>
    ),
    size
  );
}
