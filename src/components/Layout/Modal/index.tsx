'use client'

import { animateModal } from '@/animations/components'
import { IconButton } from '@/components/Ui'
import { useGSAPContext, useKeyPress } from '@/hooks'
import { useLenis } from '@studio-freight/react-lenis'
import clsx from 'clsx'
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Buttons from './components/Buttons'
import $ from './style.module.scss'

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  title?: string
  content?: React.ReactNode
  bottom?: React.ReactNode
  bottomButtons?: boolean
  openState: boolean
  setOpenState: React.Dispatch<React.SetStateAction<boolean>> // Updated type
}

export interface ModalRefProps {
  comp: ModalProps // The component props
  open: () => void // Method to open the modal
  close: () => void // Method to close the modal
  toggle: () => void // Method to toggle the modal
  getOpenState: () => boolean // Method to get the current open state
}

const Modal = forwardRef<ModalRefProps, ModalProps>(
  (
    {
      title,
      content,
      bottom,
      openState,
      setOpenState,
      bottomButtons,
      ...props
    },
    ref
  ) => {
    //Refs
    const comp = useRef<any>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const tl = useRef<GSAPTimeline>(null)

    //Hooks
    const lenis = useLenis()
    useOnClickOutside(modalRef, () => setOpenState(false))

    useGSAPContext({
      scope: comp,
      callback: () => {
        animateModal(comp, tl)
      }
    })

    useEffect(() => {
      if (!tl.current || !lenis) return
      openState ? tl.current.play() : tl.current.reverse()
      openState ? lenis.stop() : lenis.start()
    }, [openState, lenis])

    //Hanlders
    const closeModal = () => setOpenState(false)
    const openModal = () => setOpenState(true)
    const toggleModal = () => setOpenState(!openState)
    useKeyPress('Escape', closeModal)

    //API
    useImperativeHandle(ref, () => ({
      comp: comp.current,
      open: openModal,
      close: closeModal,
      toggle: toggleModal,
      getOpenState: () => openState
    }))

    return (
      <aside
        ref={comp}
        className={clsx($.modal)}
        data-active={openState}
        {...props}
      >
        <div className={$.bg} />
        <div className={clsx('main-wrapper', $.wrapper)}>
          <div className={$.modal_inner} data-inner ref={modalRef}>
            <div className={$.modal_top}>
              <p className="title-h2">{title}</p>
              <IconButton
                icon="lucide:x"
                iconAnimation="rotate"
                variant="outline"
                className={$.close}
                onClick={closeModal}
                isNext={false}
                as="div"
              />
            </div>
            <div
              className={clsx($.modal_content, !bottom && $.no_bottom)}
              data-lenis-prevent
            >
              {content}
            </div>
            {bottom ? (
              bottom
            ) : (
              <div className={$.bottom}>{bottomButtons && <Buttons />}</div>
            )}
          </div>
        </div>
      </aside>
    )
  }
)

Modal.displayName = 'Modal'
export default memo(Modal)
