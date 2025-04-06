// FaceDescriptorFromPhoto.jsx
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceDescriptorFromPhoto = () => {
    const imageRef = useRef();
    const [descriptor, setDescriptor] = useState(null);

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
            await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
            await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        };

        loadModels();
    }, []);

    const handleImageLoad = async () => {
        const detection = await faceapi
            .detectSingleFace(imageRef.current)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (detection) {
            console.log("Descriptor:", detection.descriptor);
            setDescriptor(detection.descriptor);
        } else {
            console.log("No face detected");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl mb-2">Face Descriptor from Photo</h2>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files[0]) {
                        const imgURL = URL.createObjectURL(e.target.files[0]);
                        imageRef.current.src = imgURL;
                    }
                }}
            />
            <img
                ref={imageRef}
                alt="Uploaded"
                onLoad={handleImageLoad}
                className="mt-4 max-w-sm"
            />

            {descriptor && (
                <pre className="mt-4 bg-gray-100 p-2 text-sm overflow-x-auto">
                    {JSON.stringify(descriptor, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default FaceDescriptorFromPhoto;
