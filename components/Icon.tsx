// This file provides a reusable Icon component that renders SVGs based on an icon name.
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconName } from '../types';

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 24, color = 'currentColor' }) => {
  const getIconPath = () => {
    switch (name) {
      case 'dashboard':
        return <Path d="M4 13h6v6H4v-6zm0-10h6v6H4V3zm8 10h6v6h-6v-6zm0-10h6v6h-6V3z" fill={color} />;
      case 'stats':
        return <Path d="M4 4h16v16H4V4zm2 14h12V6H6v12zM8 10h2v6H8v-6zm4 0h2v6h-2v-6zm4-3h2v9h-2v-9z" fill={color} />;
      case 'chart':
        return <Path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" fill={color} />;
      case 'weight':
        return <Path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l2.18-7.65-2.23-.73V4c0-1.1-.9-2-2-2h-5c-1.1 0-2 .9-2 2v6.62l-2.23.73L3.95 19zM6 6h5v6.97L6 18.97V6z" fill={color} />;
      case 'medal':
        return <Path d="M7 4v6l5 2.5L17 10V4H7zm-2 0H2v8c0 4.42 3.58 8 8 8s8-3.58 8-8V4h-3v6l-6 3-6-3V4z" fill={color} />;
      case 'ai':
        return <Path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18c1.1 0 2-.9 2-2v-2h-4v2c0 1.1.9 2 2 2zM5 13c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2z" fill={color} />;
      case 'skills':
        return <Path d="M12 1L9 9h6l-3-8zM5.63 10.37L2.27 8l3.36-2.37L7 9l-1.37 1.37zM18.37 10.37L21.73 8l-3.36-2.37L17 9l1.37 1.37zM12 23l3-8H9l3 8z" fill={color} />;
      case 'goals':
        return <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill={color} />;
      case 'plus':
        return <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />;
      case 'close':
        return <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill={color} />;
      case 'arrowLeft':
        return <Path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill={color} />;
      case 'arrowRight':
        return <Path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill={color} />;
      case 'user':
        return <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill={color} />;
      case 'location':
        return <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={color} />;
      case 'settings':
        return <Path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill={color} />;
      case 'check':
        return <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill={color} />;
      case 'video':
        return <Path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill={color} />;
      case 'trophy':
        return <Path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v6.21c0 .73.45 1.4 1.14 1.69L6 12.5v5.5H4v2h16v-2h-2v-5.5l2.86-1.1c.69-.29 1.14-.96 1.14-1.69V3.5A1.5 1.5 0 0 0 20.5 2zM12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill={color} />;
      case 'menu':
        return <Path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill={color} />;
      case 'bell':
        return <Path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill={color} />;
      case 'home':
        return <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={color} />;
      case 'target':
        return <Path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" fill={color} />;
      case 'shield':
        return <Path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill={color} />;
      case 'goalsAgainst':
        return <Path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.41 11.59L12 12l-2.59 2.59L8 13.17l2.59-2.59L8 8l1.41-1.41L12 9.17l2.59-2.58L16 8l-2.59 2.59L16 13.17z" fill={color} />;
      case 'clear':
        return <Path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill={color} />;
      case 'shotsFaced':
        return <Path d="M3.27 3L2 4.27l5 5V13h3v9l3.58-6.14L17.73 21 19 19.73 3.27 3zM17 10h-3.63l4 4H22v-4h-5z" fill={color} />;
      case 'minutes':
        return <Path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill={color} />;
      case 'turnovers':
        return <Path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-8C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-3.5l1.5-1.5-1.5-1.5L8.5 14l1.5 1.5-1.5 1.5-1.5-1.5zm5 0l1.5-1.5-1.5-1.5L13.5 14l1.5 1.5-1.5 1.5-1.5-1.5zm3.5 1.5l1.5-1.5-1.5-1.5 1.5-1.5 1.5 1.5-1.5 1.5 1.5 1.5-1.5 1.5z" fill={color} />;
      case 'fire':
        return <Path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" fill={color} />;
      case 'recruiting':
        return <Path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill={color} />;
      case 'messaging':
        return <Path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" fill={color} />;
      case 'profile':
        return <Path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" fill={color} />;
      case 'filter':
        return <Path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill={color} />;
      case 'share':
        return <Path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.18c.52.47 1.2.77 1.96.77 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.82C7.52 9.34 6.81 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.81 0 1.52-.34 2.04-.82l7.12 4.16c-.05.21-.08.43-.08.66 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" fill={color} />;
      case 'chevronDown':
        return <Path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill={color} />;
      case 'brain':
        return <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4v-6h2v6h-2z" fill={color} />;
      case 'send':
        return <Path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill={color} />;
      case 'play':
        return <Path d="M8 5v14l11-7z" fill={color} />;
      case 'camera':
        return <Path d="M9.4 16.6L12 19.2 14.6 16.6 17.2 19.2 19.8 16.6 22.4 19.2 21 20.6 18.4 18 15.8 20.6 13.2 18 10.6 20.6 8 18 9.4 16.6zM20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 11c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill={color} />;
      case 'sparkles':
        return <Path d="M12 2.5l1.55 3.15 3.45.5 -2.5 2.45 .6 3.4 -3.1 -1.65 -3.1 1.65 .6 -3.4 -2.5 -2.45 3.45 -.5L12 2.5zM19 12l-1.55 -3.15 -3.45 -.5 2.5 2.45 -.6 3.4 3.1 -1.65 3.1 1.65 -.6 -3.4 2.5 -2.45 -3.45 .5L19 12zM6 21l1.55 -3.15 3.45 -.5 -2.5 2.45 .6 3.4 -3.1 -1.65 -3.1 1.65 .6 -3.4 -2.5 -2.45 3.45 .5L6 21z" fill={color} />;
      case 'calendar':
        return <Path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill={color} />;
      case 'graduationCap':
        return <Path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill={color} />;
      default:
        return null;
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {getIconPath()}
    </Svg>
  );
};

