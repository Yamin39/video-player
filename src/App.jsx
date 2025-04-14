import { useState } from "react";
import CloudinaryUploader from "./components/CloudinaryUploader";
import YouTubeUploader from "./components/YouTubeUploader";

function App() {
  const [activeTab, setActiveTab] = useState("cloudinary"); // "cloudinary" or "youtube"

  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        {/* Tab Navigation */}
        <div className="w-full max-w-md mb-6 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex text-center">
            <button
              className={`flex-1 py-4 px-6 focus:outline-none transition ${
                activeTab === "cloudinary" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("cloudinary")}
            >
              Cloudinary Upload
            </button>
            <button
              className={`flex-1 py-4 px-6 focus:outline-none transition ${
                activeTab === "youtube" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("youtube")}
            >
              YouTube Video
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "cloudinary" ? <CloudinaryUploader /> : <YouTubeUploader />}
      </section>
    </>
  );
}

export default App;
