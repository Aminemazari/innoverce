'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import trafficData from './traffic_signals.json'; // Make sure this path is correct

// Create a Tailwind-style marker using divIcon
const createTailwindIcon = () =>
  L.divIcon({
    className: '', // override default
    html: `<div class="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-md"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 20],
    popupAnchor: [0, -20],
  });

const TrafficMap = () => {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    const filtered = trafficData.elements.filter(
      el => el.type === 'node' && el.tags?.highway === 'traffic_signals'
    );
    setSignals(filtered);
  }, []);

  return (
    <MapContainer center={[35.6971, -0.6308]} zoom={13} className="h-screen w-full z-0">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {signals.map(signal => (
        <Marker key={signal.id} position={[signal.lat, signal.lon]} icon={createTailwindIcon()}>
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            🚦 Traffic Signal
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TrafficMap;
