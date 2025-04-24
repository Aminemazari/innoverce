"use client";


import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import tramData from '../components/tram_segmentstwo.json'; // Your Overpass result

const statusColors = {
  green: 'green',
  yellow: 'orange',
  red: 'red',
  gray: 'gray'
};

const getRandomStatus = () => {
  const keys = Object.keys(statusColors);
  return keys[Math.floor(Math.random() * keys.length)];
};

// Component to auto-fit bounds
const FitBounds = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [bounds, map]);
  return null;
};

const TramMap = () => {
  const [stations, setStations] = useState([]);
  const [lineSegments, setLineSegments] = useState([]);
  const [bounds, setBounds] = useState([]);

  useEffect(() => {
    const nodes = tramData.elements.filter(el => el.type === 'node' && el.tags?.railway === 'tram_stop');
    const relations = tramData.elements.filter(el => el.type === 'relation' && el.tags?.route === 'tram');

    const stationWithStatus = nodes.map(stop => ({
      ...stop,
      status: getRandomStatus()
    }));

    setStations(stationWithStatus);

    // Calculate map bounds
    const stationCoords = stationWithStatus.map(s => [s.lat, s.lon]);
    setBounds(stationCoords);

    // Line segments between tram stops
    const segments = [];

    relations.forEach(rel => {
      const members = rel.members
        .filter(m => m.type === 'node')
        .map(m => tramData.elements.find(e => e.id === m.ref && e.type === 'node'))
        .filter(Boolean);

      for (let i = 0; i < members.length - 1; i++) {
        const from = members[i];
        const to = members[i + 1];
        segments.push({
          coords: [[from.lat, from.lon], [to.lat, to.lon]],
          color: statusColors[getRandomStatus()]
        });
      }
    });

    setLineSegments(segments);
  }, []);

  return (
    <MapContainer
      center={[35.6971, -0.6308]} // Fallback
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FitBounds bounds={bounds} />

      {stations.map((station, i) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lon]}
          icon={L.divIcon({
            className: 'custom-icon',
            html: `
              <div style="
                width: 18px;
                height: 18px;
                background: black;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  width: 10px;
                  height: 10px;
                  background: ${statusColors[station.status]};
                  border-radius: 50%;
                "></div>
              </div>
            `
          })}
        >
          <Tooltip>{station.tags.name || `Station ${i + 1}`}</Tooltip>
        </Marker>
      ))}

      {lineSegments.map((seg, i) => (
        <Polyline key={i} positions={seg.coords} color={seg.color} weight={5} />
      ))}
    </MapContainer>
  );
};

export default TramMap;

















