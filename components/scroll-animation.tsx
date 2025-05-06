"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  className?: string
}

export default function ScrollAnimation({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: ScrollAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const getDirectionValues = () => {
    switch (direction) {
      case "up":
        return { initial: { y: 40 }, animate: { y: 0 } }
      case "down":
        return { initial: { y: -40 }, animate: { y: 0 } }
      case "left":
        return { initial: { x: 40 }, animate: { x: 0 } }
      case "right":
        return { initial: { x: -40 }, animate: { x: 0 } }
      default:
        return { initial: { y: 40 }, animate: { y: 0 } }
    }
  }

  const { initial, animate } = getDirectionValues()

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ ...initial, opacity: 0 }}
        animate={isInView ? { ...animate, opacity: 1 } : { ...initial, opacity: 0 }}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
