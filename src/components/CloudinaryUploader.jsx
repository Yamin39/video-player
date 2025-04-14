import { useState } from "react";
import axios from "axios";

function CloudinaryUploader() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("video")) {
      setVideoFile(file);
    } else {
      alert("Please select a valid video file");
    }
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video file first");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    // Create form data for upload
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("upload_preset", "ems_event_images"); // Your upload preset

    try {
      // Upload to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dmk9n4cgh/video/upload`, // Your cloud name
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        }
      );

      setVideoURL(response.data.secure_url);
      setLoading(false);
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
      setLoading(false);
      alert("Error uploading video. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Video</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Video File</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {videoFile && <p className="mb-4 text-sm text-gray-600">Selected file: {videoFile.name}</p>}

        <button
          onClick={handleUpload}
          disabled={!videoFile || loading}
          className={`w-full py-2 px-4 rounded font-medium ${!videoFile || loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>

        {loading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <p className="text-center mt-2">{uploadProgress}%</p>
          </div>
        )}
      </div>

      {videoURL && (
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Video Preview</h2>
          <video controls className="w-full rounded" src={videoURL}>
            Your browser does not support the video tag.
          </video>

          <div className="mt-4">
            <p className="text-sm text-gray-600 break-all">
              <strong>Video URL:</strong>{" "}
              <a href={videoURL} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                {videoURL}
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default CloudinaryUploader;
