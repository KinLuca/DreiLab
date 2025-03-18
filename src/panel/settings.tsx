import React from "react";

interface ColorPickerProps {
  meshColor: string;
  setMeshColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  meshColor,
  setMeshColor,
}) => {
  return (
    <div className="container">
      <div className="color-container">
        <input
          type="color"
          value={meshColor}
          onChange={(e) => setMeshColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
