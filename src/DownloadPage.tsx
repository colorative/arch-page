import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useState } from "react";

const imageFiles = [
  "7c9041e39500bc30757630d9a41aa07b01213fef.webp",
  "2dfd71ae5cbf5f62d8dd8c312b1476fb9f7da6c0.webp",
  "8dac4b5e38b5b0e375d34d8502d63830b73167c0.webp",
  "c5896a3f6e9a45b8cbbb8b9930ad7996615f0fd6.webp",
  "864c4828a39629a006642af67b4a8d267fb629f3.webp",
  "387748e4adf2e6b54ac0f40178083b0378eb1e0c.webp",
  "99db85dcc91aadd97c4f79fbdc8a8c020b713409.webp",
  "4ef312fd151c967819dd3a272b626480d789857d.webp",
  "9647e2859bfa976db4bf477a57143f1c9102a525.webp",
  "719c0b382987dfd5da9d817ede1d3254d0b69a6c.webp",
  "33759ff19bceb78330a2904aaf9492f0142d5a04.webp",
  "4c049f939506e6741ee9886e73f8adb031717cc0.webp",
  "f9597606d5590600a1c86d3ab7337037cad30b09.webp",
  "95efec7ad4b667b29c5a193c6d40ed1476831228.webp",
  "1a2b90206843df7d3396d7efdca8484695a5ff0f.webp",
  "64763c77e7de364c5c5e7d9e8b9ca5d646fd831e.webp",
  "50c3ce98d9c92926f9fdace036a4ea4b6bcda26e.webp",
  "0f0476442586e857d987e1f900917f356c0aabd0.webp",
  "7f0904de0d0a2ea506a816f352b867e5515a6f2c.webp",
  "3a0f2c7b56877e55f37502b8a9238b4f0249b849.webp",
];

export default function DownloadPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [progress, setProgress] = useState(0);

  async function downloadZip() {
    setStatus("loading");
    setProgress(0);
    const zip = new JSZip();
    const folder = zip.folder("arch-page-images")!;

    for (let i = 0; i < imageFiles.length; i++) {
      const filename = imageFiles[i];
      const resp = await fetch(`/images/${filename}`);
      const blob = await resp.blob();
      folder.file(filename, blob);
      setProgress(Math.round(((i + 1) / imageFiles.length) * 100));
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "arch-page-images.zip");
    setStatus("done");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        fontFamily: "system-ui, sans-serif",
        color: "#fff",
        padding: 32,
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>
        Download Images
      </h1>
      <p style={{ color: "#999", margin: 0, textAlign: "center", maxWidth: 480 }}>
        Download all 20 optimized WebP images as a ZIP file. Then upload the
        contents to GitHub at{" "}
        <code style={{ color: "#27AAE2" }}>
          colorative/arch-page → src/imports/Desktop3-1/
        </code>
      </p>
      <button
        onClick={downloadZip}
        disabled={status === "loading"}
        style={{
          background: status === "done" ? "#22c55e" : "#27AAE2",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "14px 32px",
          fontSize: 16,
          fontWeight: 600,
          cursor: status === "loading" ? "not-allowed" : "pointer",
          opacity: status === "loading" ? 0.7 : 1,
          transition: "all 0.2s",
        }}
      >
        {status === "idle" && "Download arch-page-images.zip"}
        {status === "loading" && `Packing… ${progress}%`}
        {status === "done" && "Downloaded!"}
      </button>
      {status === "done" && (
        <p style={{ color: "#22c55e", margin: 0, fontSize: 14 }}>
          ZIP saved. Upload to GitHub: go to your repo → Add file → Upload
          files → drag the 20 .webp files into{" "}
          <code>src/imports/Desktop3-1/</code>
        </p>
      )}
    </div>
  );
}
