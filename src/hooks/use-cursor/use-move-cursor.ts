import { useStoreCursor } from '@/store'
import { DEBUG, USE } from '@config'
import { ScrollTrigger, gsap } from '@gsap'
import { useEffect } from 'react'

const useMoveCursor = (
  // eslint-disable-next-line
  callback: (x: number, y: number) => void
) => {
  DEBUG.cursor && console.log('---------Cursor Debug-----------')
  DEBUG.cursor && console.log('Cursor Store', useStoreCursor.getState())

  useEffect(() => {
    if (USE.cursor === false) return
    gsap.registerPlugin(ScrollTrigger)
    const observe = ScrollTrigger.observe({
      target: window,
      type: 'pointer',
      onMove: (self) => {
        DEBUG.cursor && console.log('cursor position', self.x, self.y)
        // Call the callback with x and y
        callback(self.x as number, self.y as number)
      }
    })

    // Cleanup function to remove event listeners
    return () => {
      observe.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback])
}

export default useMoveCursor
