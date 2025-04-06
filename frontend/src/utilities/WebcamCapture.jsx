import React from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);

  //   const capture = React.useCallback(() => {
  //     const imageSrc = webcamRef.current.getScreenshot();
  //     console.log(imageSrc);
  //   }, [webcamRef]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-60 border-2 border-gray-300 rounded-lg overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "user",
          }}
          className="w-full h-full"
        />
      </div>
      {/* <button
        onClick={capture}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Capture
      </button> */}
    </div>
  );
};

export default WebcamCapture;
