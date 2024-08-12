import { useEffect, useRef, useState } from 'react'

export function useVisiblePercentage(scrollFactor: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [visiblePercentage, setVisiblePercentage] = useState<number>(50)

  const calculateVisiblePercentage = () => {
    if (!ref.current) return

    const windowHeight = window.innerHeight
    const elementTop = ref.current.getBoundingClientRect().top
    const elementHeight = ref.current.clientHeight

    const scrollVisibility =
      (windowHeight - elementTop * scrollFactor) /
      (elementHeight * scrollFactor)

    const percent = Math.max(0, Math.min(100, scrollVisibility * 100))
    setVisiblePercentage(percent)
  }

  useEffect(() => {
    const handleScroll = () => {
      calculateVisiblePercentage()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    calculateVisiblePercentage()
  }, [])

  return { ref, visiblePercentage }
}
