"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ImageContextType = {
  getImage: (type: string, key?: string) => string
  isLoaded: boolean
}

const ImageContext = createContext<ImageContextType>({
  getImage: () => "/placeholder.svg",
  isLoaded: false,
})

export function ImageProvider({ children }: { children: ReactNode }) {
  const [homeHeroImage, setHomeHeroImage] = useState<string | null>(null)
  const [aboutHeroImage, setAboutHeroImage] = useState<string | null>(null)
  const [categoryImages, setCategoryImages] = useState<{ [key: string]: string | null }>({})
  const [productImages, setProductImages] = useState<{ [key: string]: string | null }>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load images from localStorage
    const savedHomeHero = localStorage.getItem("homeHeroImage")
    if (savedHomeHero) setHomeHeroImage(savedHomeHero)

    const savedAboutHero = localStorage.getItem("aboutHeroImage")
    if (savedAboutHero) setAboutHeroImage(savedAboutHero)

    const savedCategoryImages = localStorage.getItem("categoryImages")
    if (savedCategoryImages) setCategoryImages(JSON.parse(savedCategoryImages))

    const savedProductImages = localStorage.getItem("productImages")
    if (savedProductImages) setProductImages(JSON.parse(savedProductImages))

    setIsLoaded(true)
  }, [])

  const getImage = (type: string, key?: string): string => {
    if (type === "homeHero" && homeHeroImage) {
      return homeHeroImage
    } else if (type === "aboutHero" && aboutHeroImage) {
      return aboutHeroImage
    } else if (type === "category" && key && categoryImages[key]) {
      return categoryImages[key] as string
    } else if (type === "product" && key && productImages[key]) {
      return productImages[key] as string
    }

    // Return placeholder if no image is found
    if (type === "homeHero") {
      return "/placeholder.svg?height=1080&width=1920"
    } else if (type === "aboutHero") {
      return "/placeholder.svg?height=800&width=1920"
    } else if (type === "category") {
      return "/placeholder.svg?height=600&width=400"
    } else if (type === "product") {
      return "/placeholder.svg?height=400&width=300"
    }

    return "/placeholder.svg"
  }

  return <ImageContext.Provider value={{ getImage, isLoaded }}>{children}</ImageContext.Provider>
}

export function useImages() {
  return useContext(ImageContext)
}
