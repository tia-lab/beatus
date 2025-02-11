'use client'

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import React, { useRef } from 'react'
import { styles } from './style'

export type MapProps = {
  markers: any[] // Array of marker data
  apiKey: string
  center: { lat: number; lng: number }
  zoom: number
  onMarkerClick?: (_index: number) => void
  selectedIndex: number | null // Currently selected marker index
}

const libraries: 'places'[] = ['places']

const Map: React.FC<MapProps> = ({
  markers,
  apiKey,
  center,
  zoom,
  onMarkerClick,
  selectedIndex
}) => {
  const containerStyle = {
    width: '100%',
    height: '100%'
  }

  const mapRef = useRef<any>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries
  })

  const handleMapLoad = (map: any) => {
    mapRef.current = map
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <GoogleMap
      options={{
        cameraControl: true,
        styles,
        disableDefaultUI: true
      }}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={handleMapLoad}
    >
      {markers.map((marker, index) => {
        const isSelected = selectedIndex === index // Check if this marker is selected

        return (
          //@ts-ignore
          <Marker
            key={index}
            position={{
              lat: marker.address.coordinates.lat,
              lng: marker.address.coordinates.lng
            }}
            icon={{
              url: isSelected
                ? 'https://www.datocms-assets.com/146175/1732798577-skischule_logo.svg' // Colored icon
                : 'https://www.datocms-assets.com/146175/1733488121-favicon-edited.png', // Black-and-white icon
              scaledSize: { width: 40, height: 40 },
              anchor: { x: 20, y: 20 }
            }}
            title={marker.title || ''}
            onClick={() => onMarkerClick && onMarkerClick(index)}
          />
        )
      })}
    </GoogleMap>
  )
}

export default Map
