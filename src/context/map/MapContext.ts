import { Map } from 'mapbox-gl';
import { createContext } from 'react';

interface MapContextProp {
    isMapReady: boolean,
    map?: Map,

    // Methods
    setMap: (map: Map) => void;
}

export const MapContext = createContext({} as MapContextProp);