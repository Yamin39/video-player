import { useState } from "react";

function YouTubeUploader() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState("");

  const extractVideoId = (url) => {
    // Extract YouTube video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setYoutubeUrl(url);
    
    if (url) {
      const id = extractVideoId(url);
      if (id) {
        setVideoId(id);
        setError("");
      } else {
        setVideoId("");
        setError("Invalid YouTube URL");
      }
    } else {
      setVideoId("");
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoId) {
      setError("Please enter a valid YouTube URL");
    }
  };

  return (
    <>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">YouTube Video</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Enter YouTube URL</label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={handleUrlChange}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}
          
          <button 
            type="submit"
            disabled={!videoId}
            className={`w-full py-2 px-4 rounded font-medium ${!videoId ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
          >
            Add YouTube Video
          </button>
        </form>
      </div>

      {videoId && (
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">YouTube Video Preview</h2>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-72 rounded"
            ></iframe>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600 break-all">
              <strong>YouTube URL:</strong>{" "}
              <a href={youtubeUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                {youtubeUrl}
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Video ID:</strong> {videoId}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default YouTubeUploader;
