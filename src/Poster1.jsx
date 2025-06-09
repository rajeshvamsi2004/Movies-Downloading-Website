import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { FaCloudDownloadAlt } from "react-icons/fa";
import ReviewComponent from "./ReviewComponent";

const Poster1 = () => {
  const location = useLocation();
  const movie = location.state; 
  const [show, setShow] = useState(false);

  const trailerUrl = movie.Trailer
    ? movie.Trailer.replace("youtu.be", "www.youtube.com/embed")
    : "NO Trailer Found";
  
  const fileId = movie.fileId || "";
  // Update this line to use the actual filename if available
  const fileName = movie.fileName || "Choododhantunna_4K_DtsX_1080P_60FPS (3).mp4"; 
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  const downloadUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;

  const handleDownload = async () => {
    if (!fileId) {
      console.error("⚠️ File ID is missing! Cannot download.");
      return;
    }

    try {
      // ✅ Start the local download
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      console.log(`✅ Downloading ${fileName}...`);

      // ✅ Simultaneously trigger backend upload
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName }),
      });

      const data = await response.json();
      console.log("✅ Upload Response:", data.message);
    } catch (error) {
      console.error("❌ Download/Upload error:", error);
    }
  };

  return (
    <div id="poster1">
      <div style={show ? { display: "none" } : {}}>
        <h1 className="bahuh">{movie.title}</h1>
        <p className="yearseven">{movie.year}</p>
        <p className="zonerseven">{movie.Type}</p>
        <img className="bahu" src={movie.image1} alt="" />
        <MdManageAccounts className="iconprofile" />
        <span>Cast: {movie.Cast}</span>
        <MdManageAccounts className="iconprofile2" />
        <span className="span2">Crew: {movie.Crew}</span>
        <button onClick={() => setShow(!show)} className="Trailer">
          Trailer
        </button>

        {/* ✅ Updated Download Button */}
        <button
          onClick={handleDownload}
          className="download-btn"
          style={{
            position: "absolute",
            display: "flex",
            top: "190px",
            left: "300px",
            alignItems: "center",
            gap: "5px",
            padding: "8px 12px",
            border: "none",
            background: "yellow",
            borderRadius: "5px",
            cursor: "pointer",
            color: "black",
            width: "120px",
            height: "25px",
          }}
        >
          <FaCloudDownloadAlt />
          <span className="span3">Download</span>
        </button>
      </div>

      <iframe
        className="video"
        style={show ? { display: "none" } : {}}
        src={embedUrl}
        allow="autoplay"
        allowFullScreen
        title="Google Drive Video"
      ></iframe>

      {show && (
        <>
          <p onClick={() => setShow(!show)} className="into">
            X
          </p>
          <iframe
            controls
            className="Trailervideo"
            src={trailerUrl}
            frameBorder="0"
          ></iframe>
        </>
      )}

      {!show && <ReviewComponent movieTitle={movie.title} />}
    </div>
  );
};

export default Poster1;
