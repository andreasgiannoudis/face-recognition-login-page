import Camera from "./Camera";

type Props = {
  onCapture: (img: string) => void;
};

export default function CameraView({ onCapture }: Props) {
  return (
    <div className="camera-wrapper">
      <Camera
        onCapture={(img) => {
          onCapture(img);
        }}
      />
    </div>
  );
}