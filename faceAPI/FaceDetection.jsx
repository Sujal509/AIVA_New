import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceDetection = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const MODEL_URL = "/models";

    // Load models
    useEffect(() => {
        const loadModels = async () => {
            try {
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                    faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
                ]);
                startVideo();
            } catch (err) {
                console.error("Model load error:", err);
            }
        };

        const startVideo = () => {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                })
                .catch((err) => console.error("Camera error:", err));
        };

        loadModels();
    }, []);

    // Handle detection
    useEffect(() => {
        const handleVideoPlay = () => {
            if (!videoRef.current) return;

            // Prevent multiple canvases
            let existingCanvas = canvasRef.current;
            if (!existingCanvas) {
                const newCanvas = faceapi.createCanvasFromMedia(
                    videoRef.current
                );
                canvasRef.current = newCanvas;
                newCanvas.style.position = "absolute";
                newCanvas.style.top = "0";
                newCanvas.style.left = "0";
                videoRef.current.parentElement.appendChild(newCanvas);
            }

            const canvas = canvasRef.current;
            const displaySize = {
                width: videoRef.current.width,
                height: videoRef.current.height,
            };

            faceapi.matchDimensions(canvas, displaySize);

            const interval = setInterval(async () => {
                const detections = await faceapi
                    .detectAllFaces(
                        videoRef.current,
                        new faceapi.TinyFaceDetectorOptions()
                    )
                    .withFaceLandmarks()
                    .withFaceExpressions()
                    .withAgeAndGender()
                    .withFaceDescriptors();

                const resizedDetections = faceapi.resizeResults(
                    detections,
                    displaySize
                );
                resizedDetections.forEach((detection) => {
                    const { age, gender, genderProbability } = detection;
                    const box = detection.detection.box;
                    // You can get other data like:
                    const expressions = detection.expressions;
                    const landmarks = detection.landmarks;
                    const descriptors = detection.descriptor;

                    // Here you can use the values as needed:
                    console.log({
                        age: parseInt(age),
                        gender,
                        confidence: (genderProbability * 100).toFixed(0),
                        expressions,
                        landmarks,
                        box,
                        descriptors,
                    });
                    console.log(descriptors);
                });

                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                faceapi.draw.drawDetections(canvas, resizedDetections);
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

                // Draw age & gender
                resizedDetections.forEach((detection) => {
                    const { age, gender, genderProbability } = detection;
                    const box = detection.detection.box;
                    const drawBox = new faceapi.draw.DrawBox(box, {
                        label: `${parseInt(age)} yrs | ${gender} (${(
                            genderProbability * 100
                        ).toFixed(0)}%)`,
                    });
                    drawBox.draw(canvas);
                });
            }, 100);

            return () => clearInterval(interval);
        };

        const video = videoRef.current;
        if (video) {
            video.addEventListener("play", handleVideoPlay);
        }

        return () => {
            if (canvasRef.current) {
                canvasRef.current.remove();
                canvasRef.current = null;
            }
        };
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <video
                ref={videoRef}
                width="720"
                height="560"
                autoPlay
                muted
                style={{ border: "1px solid black" }}
            />
        </div>
    );
};

export default FaceDetection;
