import { Details } from './MapProvider';
import { Map } from 'mapbox-gl';
import { createContext } from 'react';

interface MapContextProp {
    isMapReady: boolean,
    map?: Map,

    // Methods
    setMap: (map: Map) => void;
    getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
    details: Details;
    markerRadius: number;
    setMarkerRadius: (radius: number) => void;
}

export const MapContext = createContext({} as MapContextProp);