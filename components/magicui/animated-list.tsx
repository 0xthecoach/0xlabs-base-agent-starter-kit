"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import React, { type ComponentPropsWithoutRef, useEffect, useMemo, useState } from "react"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
  maxVisibleItems?: number
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, maxVisibleItems = 4, ...props }: AnimatedListProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const childrenArray = useMemo(() => React.Children.toArray(children), [children])
    const totalItems = childrenArray.length

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems)
      }, delay)

      return () => clearInterval(interval)
    }, [delay, totalItems])

    const visibleItems = useMemo(() => {
      const items = []

      // Calculate which items should be visible
      for (let i = 0; i < Math.min(maxVisibleItems, totalItems); i++) {
        const index = (currentIndex - i + totalItems) % totalItems
        if (index >= 0) {
          items.push({
            item: childrenArray[index],
            key: `item-${index}`,
          })
        }
      }

      return items.reverse() // Reverse to maintain proper stacking order
    }, [currentIndex, childrenArray, maxVisibleItems, totalItems])

    return (
      <div className={cn(`flex flex-col items-center gap-3`, className)} {...props}>
        <AnimatePresence mode="popLayout">
          {visibleItems.map(({ item, key }) => (
            <AnimatedListItem key={key}>{item}</AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  },
)

AnimatedList.displayName = "AnimatedList"
