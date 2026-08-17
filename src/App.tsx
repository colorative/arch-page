import Desktop from "@/imports/Desktop3-1/index";
import DownloadPage from "@/DownloadPage";

const isDownloadPage = window.location.search.includes("download");

export default function App() {
  if (isDownloadPage) return <DownloadPage />;
  return (
    <div style={{ minWidth: 1440 }}>
      <Desktop />
    </div>
  );
}
