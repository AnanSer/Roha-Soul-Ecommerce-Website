"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ImageUrlContextType = {
  getImageUrl: (type: string, key?: string) => string
  isLoaded: boolean
}

const ImageUrlContext = createContext<ImageUrlContextType>({
  getImageUrl: () => "/placeholder.svg",
  isLoaded: false,
})

export function ImageUrlProvider({ children }: { children: ReactNode }) {
  const [homeHeroImage, setHomeHeroImage] = useState<string | null>(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-friday-sales-sign-neon-light.jpg-xdRJ8e1RUN6okdNUwUAdy1ST8Mqq4b.jpeg",
  ) // Set default hero image
  const [aboutHeroImage, setAboutHeroImage] = useState<string | null>(null)
  const [categoryImages, setCategoryImages] = useState<{ [key: string]: string | null }>({})
  const [productImages, setProductImages] = useState<{ [key: string]: string | null }>({})
  const [logoImage, setLogoImage] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load image URLs from localStorage
    const savedHomeHero = localStorage.getItem("homeHeroImageUrl")
    if (savedHomeHero) setHomeHeroImage(savedHomeHero)
    else
      localStorage.setItem(
        "homeHeroImageUrl",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-friday-sales-sign-neon-light.jpg-xdRJ8e1RUN6okdNUwUAdy1ST8Mqq4b.jpeg",
      ) // Save default hero image

    const savedAboutHero = localStorage.getItem("aboutHeroImageUrl")
    if (savedAboutHero) setAboutHeroImage(savedAboutHero)

    const savedCategoryImages = localStorage.getItem("categoryImageUrls")
    if (savedCategoryImages) setCategoryImages(JSON.parse(savedCategoryImages))

    const savedProductImages = localStorage.getItem("productImageUrls")
    if (savedProductImages) setProductImages(JSON.parse(savedProductImages))

    const savedLogo = localStorage.getItem("logoImageUrl")
    if (savedLogo) setLogoImage(savedLogo)

    const savedLogoImage = localStorage.getItem("logoImageUrl")
    if (savedLogoImage) setLogoImage(savedLogoImage)

    setIsLoaded(true)
  }, [])

  const getImageUrl = (type: string, key?: string): string => {
    if (type === "homeHero" && homeHeroImage) {
      return homeHeroImage
    } else if (type === "aboutHero" && aboutHeroImage) {
      return aboutHeroImage
    } else if (type === "category" && key && categoryImages[key]) {
      return categoryImages[key] as string
    } else if (type === "product" && key && productImages[key]) {
      return productImages[key] as string
    } else if (type === "logo" && logoImage) {
      return logoImage
    }

    // Return placeholder if no image URL is found
    if (type === "homeHero") {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-friday-sales-sign-neon-light.jpg-xdRJ8e1RUN6okdNUwUAdy1ST8Mqq4b.jpeg" // Default to the uploaded image
    } else if (type === "aboutHero") {
      return "/placeholder.svg?height=800&width=1920"
    } else if (type === "category") {
      return "/placeholder.svg?height=600&width=400"
    } else if (type === "product") {
      return "/placeholder.svg?height=400&width=300"
    } else if (type === "logo") {
      return "/placeholder.svg?height=40&width=40"
    }

    return "/placeholder.svg"
  }

  return <ImageUrlContext.Provider value={{ getImageUrl, isLoaded }}>{children}</ImageUrlContext.Provider>
}

export function useImageUrls() {
  return useContext(ImageUrlContext)
}
