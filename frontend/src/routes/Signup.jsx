import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function Signup() {
  const webcamRef = useRef(null);
  const [faceDescriptor, setFaceDescriptor] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const captureFace = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setFaceDescriptor(imageSrc); // Save base64 image as "descriptor"
      setPreviewImage(imageSrc); // Optional preview
    }
  };

  return (
    <div className="bg-gray-800 text-gray-600 min-h-screen">
      <div className="p-10">
        <h1 className="mb-8 font-extrabold text-4xl text-white">Register</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form>
            {/* Name */}
            <div>
              <label
                className="block font-semibold text-white mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm text-gray-50 bg-gray-700"
                id="name"
                type="text"
                name="name"
                required
                autoFocus
              />
            </div>

            {/* Employee ID */}
            <div className="mt-4">
              <label
                className="block font-semibold text-white mb-2"
                htmlFor="employee_id"
              >
                Employee Id
              </label>
              <input
                className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm text-gray-50 bg-gray-700"
                id="employee_id"
                type="number"
                name="employee_id"
                required
              />
            </div>

            {/* Batch */}
            <div className="mt-4">
              <label
                className="block font-semibold text-white mb-2"
                htmlFor="batch"
              >
                Batch
              </label>
              <select
                className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm text-gray-50 bg-gray-700"
                id="batch"
                name="batch"
                required
              >
                <option value="">Select Batch</option>
                <option value="Batch 42">Batch 42</option>
                <option value="Batch 43">Batch 43</option>
              </select>
            </div>

            {/* Sub Batch */}
            <div className="mt-4">
              <label
                className="block font-semibold text-white mb-2"
                htmlFor="subbatch"
              >
                Sub Batch
              </label>
              <select
                className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm text-gray-50 bg-gray-700"
                id="subbatch"
                name="subbatch"
                required
              >
                <option value="">Select Sub Batch</option>
                {["A", "B", "C", "D"].flatMap((batch) =>
                  [1, 2, 3, 4, 5].map((num) => (
                    <option key={`${batch}${num}`} value={`${batch}${num}`}>
                      {batch}
                      {num}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Hidden input for descriptor */}
            <input
              type="hidden"
              name="face_descriptor"
              value={faceDescriptor}
            />

            {/* Capture button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={captureFace}
                className="text-sm text-purple-400 hover:underline"
              >
                Capture Face Descriptor
              </button>
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Captured Face"
                    className="w-32 h-32 rounded border mt-2"
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                className="px-8 py-3 rounded-md text-white bg-purple-600 hover:bg-purple-700 text-base font-medium"
              >
                Start Scanning
              </button>
            </div>
          </form>

          {/* Webcam & Instructions */}
          <aside className="space-y-4">
            <div className="bg-gray-700 p-4 rounded text-gray-50">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "user" }}
                className="rounded w-full"
              />
            </div>

            <div className="bg-gray-700 p-8 rounded text-gray-50">
              <h2 className="font-bold text-2xl">Instructions</h2>
              <ul className="list-disc mt-4 list-inside text-sm space-y-2">
                <li>Ensure your face is clearly visible in the camera.</li>
                <li>
                  Use the "Capture Face Descriptor" button to snap your image.
                </li>
                <li>Avoid submitting without face capture.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Signup;
