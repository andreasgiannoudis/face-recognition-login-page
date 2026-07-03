import { useRef } from "react";
import Webcam from "react-webcam";

interface CameraProps {
  onCapture: (image: string) => void;
}

export default function Camera({ onCapture }: CameraProps) {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const image = webcamRef.current?.getScreenshot();

    if (image) {
      onCapture(image);
    }
  };

  return (
    <div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        mirrored
      />

      <button onClick={capture}>
        Capture
      </button>
    </div>
  );
}