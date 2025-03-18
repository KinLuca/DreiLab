import React from 'react';
import { useRoute, useLocation } from 'wouter';
import LabLogo from '../assets/logo/Lab-Logo';
import ColorPicker from '../panel/settings';

interface OverlayProps {
  meshColor: string;
  setMeshColor: React.Dispatch<React.SetStateAction<string>>;
}

const ZPanel: React.FC<OverlayProps> = ({ meshColor, setMeshColor }) => {
  const [, params] = useRoute('/item/:id');
  const [, setLocation] = useLocation();

  return (
    <div style={{
      position: 'absolute', top: 0,
      left: 0, width: '100%', height: '100%',
      zIndex: 100,
    }}>
      <ColorPicker meshColor={meshColor} setMeshColor={setMeshColor} /> {/* Now using props */}

      <a
        href="https://kinluca.com/"
        style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}
      >
        <LabLogo />
        LAB Copyright
      </a>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>
        15/06/2025
      </div>

      <a
        style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setLocation('/');
        }}
      >
        {params ? '< back' : 'double click to enter portal'}
      </a>

    </div>
  );
};

export default ZPanel;
