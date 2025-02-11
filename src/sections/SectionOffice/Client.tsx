'use client'

import { CardOffice } from '@/components/Project'
import clsx from 'clsx'
import { readFragment } from 'gql.tada'
import { memo, useEffect, useState } from 'react'
import { SectionOfficeProps } from '.'
import Map from './Components/Map'
import SectionOfficeFragment from './query'
import $ from './style.module.scss'

const Client = ({ data }: SectionOfficeProps) => {
  const d = readFragment(SectionOfficeFragment, data)

  // Initialize state with the first element as active
  const [mapState, setMapState] = useState({
    zoom: d.mapZoom || 10,
    center: (d.offices[0]?.address as any).coordinates || { lat: 0, lng: 0 }
  })

  const [selectedIndex, setSelectedIndex] = useState<number>(0) // Default to the first element

  const handleCardClick = (office: (typeof d.offices)[0], index: number) => {
    setMapState({
      zoom: 14, // Adjust zoom level as needed
      center: (office.address as any).coordinates
    })
    setSelectedIndex(index) // Update the selected index
  }

  useEffect(() => {
    // Automatically set the first office as active on mount
    const firstOffice = d.offices[0]
    if (firstOffice) {
      setMapState({
        zoom: 14, // Adjust initial zoom level as needed
        center: (firstOffice.address as any).coordinates
      })
    }
  }, [d.offices])

  return (
    <>
      <div className={$.map}>
        <Map
          //@ts-ignore
          data={data}
          markers={d.offices as any}
          apiKey={
            process.env.NEXT_PUBLIC_GOOGLE_API ||
            'AIzaSyBPIQgMqVe6Z-gcWjVhcTEzKUuEkFZlKa8'
          }
          center={mapState.center}
          zoom={mapState.zoom}
          selectedIndex={selectedIndex} // Pass the selected index to the map
          onMarkerClick={(index) => {
            const selectedOffice = d.offices[index]
            setMapState({
              zoom: 14,
              center: (selectedOffice.address as any).coordinates
            })
            setSelectedIndex(index)
          }}
        />
      </div>
      <div className={clsx($.offices)}>
        {d.offices.map((office, i) => (
          <div
            key={i}
            className={clsx(
              $.card,
              selectedIndex === i ? $.selected : $.inactive // Apply opacity class
            )}
            onClick={() => handleCardClick(office, i)}
          >
            <CardOffice data={office as any} />
            {i !== d.offices.length - 1 && <div className={$.divider} />}
          </div>
        ))}
      </div>
    </>
  )
}

export default memo(Client)
