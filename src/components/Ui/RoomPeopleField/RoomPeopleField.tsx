'use client'

import { Button, IconButton, TextField } from '@/components/Ui'
import { useKeyPress } from '@/hooks'
import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import NumberField from './Components/NumberField'
import $ from './style.module.scss'

const MAX_CHILDREN = 6
const MAX_ROOMS = 5 // Maximum number of rooms

export interface Room {
  adults: number
  children: number
  childrenAges: number[]
}

interface RoomPeopleFieldProps {
  value: Room[]
  onChange: (_rooms: Room[]) => void
}

const RoomPeopleField = ({ value, onChange }: RoomPeopleFieldProps) => {
  const comp = useRef<HTMLDivElement>(null)

  const t = useTranslations()

  // Keep local state synchronized with Formik
  const [rooms, setRooms] = useState<Room[]>(value)
  const [open, setOpen] = useState(false)

  // Sync state only if Formik updates externally
  if (JSON.stringify(rooms) !== JSON.stringify(value)) {
    setRooms(value)
  }

  // Handle room addition (up to MAX_ROOMS)
  const addRoom = () => {
    if (rooms.length < MAX_ROOMS) {
      const newRooms = [...rooms, { adults: 2, children: 0, childrenAges: [] }]
      setRooms(newRooms)
      onChange(newRooms)
    }
  }

  // Handle room removal
  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      const updatedRooms = rooms.filter((_, i) => i !== index)
      setRooms(updatedRooms)
      onChange(updatedRooms)
    }
  }

  // Handle changes in adults, children, or child ages
  const updateRoom = (index: number, field: keyof Room, value: any) => {
    const updatedRooms = [...rooms]

    if (field === 'children') {
      const newChildren = Math.max(0, Math.min(MAX_CHILDREN, value))
      updatedRooms[index].children = newChildren

      if (newChildren > updatedRooms[index].childrenAges.length) {
        updatedRooms[index].childrenAges = [
          ...updatedRooms[index].childrenAges,
          ...Array(newChildren - updatedRooms[index].childrenAges.length).fill(
            2
          )
        ]
      } else {
        updatedRooms[index].childrenAges = updatedRooms[
          index
        ].childrenAges.slice(0, newChildren)
      }
    } else {
      updatedRooms[index][field] = value
    }

    setRooms(updatedRooms)
    onChange(updatedRooms)
  }

  // Handle individual child's age update
  const updateChildAge = (
    roomIndex: number,
    childIndex: number,
    age: number
  ) => {
    const updatedRooms = [...rooms]
    updatedRooms[roomIndex].childrenAges[childIndex] = Math.max(0, age)
    setRooms(updatedRooms)
    onChange(updatedRooms)
  }

  useOnClickOutside(comp, () => setOpen(false))
  useKeyPress('Escape', () => setOpen(false))

  return (
    <div className={$.field} ref={comp}>
      <div onClick={() => setOpen(!open)}>
        <TextField
          label={t('booking_bar_room_label')}
          placeholder="Select guests"
          value={`${t('rooms', { count: rooms.length })}, ${t('adults', { count: rooms.reduce((total, room) => total + room.adults, 0) })}, ${t('children', { count: rooms.reduce((total, room) => total + room.children, 0) })}`}
        />
      </div>
      <div className={$.popover} data-visible={open}>
        <div className={$.rooms}>
          {rooms.map((room, roomIndex) => (
            <div key={roomIndex} className={$.room}>
              <p>Room {roomIndex + 1}</p>
              <NumberField
                label={t('adults_simple')}
                step={1}
                minValue={1}
                value={room.adults}
                onChange={(val) => updateRoom(roomIndex, 'adults', val)}
              />
              <NumberField
                label={t('children_simple')}
                step={1}
                minValue={0}
                maxValue={MAX_CHILDREN}
                value={room.children}
                onChange={(val) => updateRoom(roomIndex, 'children', val)}
              />
              {room.childrenAges.map((age, childIndex) => (
                <NumberField
                  key={childIndex}
                  label={`${t('child')} ${childIndex + 1} ${t('age')}`}
                  step={1}
                  minValue={0}
                  value={age}
                  onChange={(val) => updateChildAge(roomIndex, childIndex, val)}
                />
              ))}
              {rooms.length > 1 && (
                <IconButton
                  isNext={false}
                  variant="outline"
                  size="small"
                  icon={<Trash width="100%" height="100%" strokeWidth={1} />}
                  as="button"
                  className={$.remove_button}
                  onClick={() => removeRoom(roomIndex)}
                />
              )}
            </div>
          ))}
        </div>
        {rooms.length < MAX_ROOMS && (
          <Button
            className={$.button}
            onClick={addRoom}
            isNext={false}
            as="button"
          >
            Add Room
          </Button>
        )}
      </div>
    </div>
  )
}

export default RoomPeopleField
