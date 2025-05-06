"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Upload, X, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"

export default function ImageManagementPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("home")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Image states for different sections
  const [homeHeroImage, setHomeHeroImage] = useState<string | null>(null)
  const [aboutHeroImage, setAboutHeroImage] = useState<string | null>(null)
  const [categoryImages, setCategoryImages] = useState<{ [key: string]: string | null }>({
    "health-wellness": null,
    "beauty-personal-care": null,
    "electronics-gadgets": null,
    "home-living": null,
  })
  const [productImages, setProductImages] = useState<{ [key: string]: string | null }>({})

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  // Load saved images on component mount
  useEffect(() => {
    // In a real app, this would fetch from your backend
    // For now, we'll use localStorage as a simple storage solution
    const savedHomeHero = localStorage.getItem("homeHeroImage")
    if (savedHomeHero) setHomeHeroImage(savedHomeHero)

    const savedAboutHero = localStorage.getItem("aboutHeroImage")
    if (savedAboutHero) setAboutHeroImage(savedAboutHero)

    const savedCategoryImages = localStorage.getItem("categoryImages")
    if (savedCategoryImages) setCategoryImages(JSON.parse(savedCategoryImages))

    const savedProductImages = localStorage.getItem("productImages")
    if (savedProductImages) setProductImages(JSON.parse(savedProductImages))
  }, [])

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, imageType: string, categoryKey?: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + 5
      })
    }, 100)

    // Read the file as data URL
    const reader = new FileReader()
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string

      // Update the appropriate state based on imageType
      if (imageType === "homeHero") {
        setHomeHeroImage(imageUrl)
        localStorage.setItem("homeHeroImage", imageUrl)
      } else if (imageType === "aboutHero") {
        setAboutHeroImage(imageUrl)
        localStorage.setItem("aboutHeroImage", imageUrl)
      } else if (imageType === "category" && categoryKey) {
        const updatedCategoryImages = { ...categoryImages, [categoryKey]: imageUrl }
        setCategoryImages(updatedCategoryImages)
        localStorage.setItem("categoryImages", JSON.stringify(updatedCategoryImages))
      } else if (imageType === "product") {
        // For product images, we'll use the file name as the key
        const productKey = file.name.replace(/\.[^/.]+$/, "") // Remove extension
        const updatedProductImages = { ...productImages, [productKey]: imageUrl }
        setProductImages(updatedProductImages)
        localStorage.setItem("productImages", JSON.stringify(updatedProductImages))
      }

      // Complete the upload
      clearInterval(interval)
      setUploadProgress(100)
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
        toast({
          title: "Image uploaded",
          description: "Your image has been uploaded successfully",
        })
      }, 500)
    }

    reader.readAsDataURL(file)
  }

  // Handle image removal
  const handleRemoveImage = (imageType: string, categoryKey?: string) => {
    if (imageType === "homeHero") {
      setHomeHeroImage(null)
      localStorage.removeItem("homeHeroImage")
    } else if (imageType === "aboutHero") {
      setAboutHeroImage(null)
      localStorage.removeItem("aboutHeroImage")
    } else if (imageType === "category" && categoryKey) {
      const updatedCategoryImages = { ...categoryImages, [categoryKey]: null }
      setCategoryImages(updatedCategoryImages)
      localStorage.setItem("categoryImages", JSON.stringify(updatedCategoryImages))
    } else if (imageType === "product" && categoryKey) {
      const updatedProductImages = { ...productImages }
      delete updatedProductImages[categoryKey]
      setProductImages(updatedProductImages)
      localStorage.setItem("productImages", JSON.stringify(updatedProductImages))
    }

    toast({
      title: "Image removed",
      description: "The image has been removed successfully",
    })
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Image Management</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="home">Home Page</TabsTrigger>
            <TabsTrigger value="about">About Page</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          {/* Home Page Images */}
          <TabsContent value="home">
            <Card>
              <CardHeader>
                <CardTitle>Home Page Hero Image</CardTitle>
                <CardDescription>
                  Upload an image for the home page hero section. Recommended size: 1920x1080px.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label htmlFor="homeHeroUpload">Upload Image</Label>
                      <Input
                        id="homeHeroUpload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "homeHero")}
                        disabled={isUploading}
                      />
                    </div>
                    {isUploading && activeTab === "home" && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{uploadProgress}%</span>
                      </div>
                    )}
                  </div>

                  {homeHeroImage && (
                    <div className="relative border rounded-md overflow-hidden">
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={homeHeroImage || "/placeholder.svg"}
                          alt="Home hero preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => handleRemoveImage("homeHero")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Page Images */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Page Hero Image</CardTitle>
                <CardDescription>
                  Upload an image for the about page hero section. Recommended size: 1920x800px.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label htmlFor="aboutHeroUpload">Upload Image</Label>
                      <Input
                        id="aboutHeroUpload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "aboutHero")}
                        disabled={isUploading}
                      />
                    </div>
                    {isUploading && activeTab === "about" && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{uploadProgress}%</span>
                      </div>
                    )}
                  </div>

                  {aboutHeroImage && (
                    <div className="relative border rounded-md overflow-hidden">
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={aboutHeroImage || "/placeholder.svg"}
                          alt="About hero preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => handleRemoveImage("aboutHero")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Category Images */}
          <TabsContent value="categories">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(categoryImages).map(([key, imageUrl]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle>
                      {key
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" & ")}
                    </CardTitle>
                    <CardDescription>
                      Upload an image for the {key.replace("-", " & ")} category. Recommended size: 600x800px.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Label htmlFor={`${key}Upload`}>Upload Image</Label>
                          <Input
                            id={`${key}Upload`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "category", key)}
                            disabled={isUploading}
                          />
                        </div>
                        {isUploading && activeTab === "categories" && (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>{uploadProgress}%</span>
                          </div>
                        )}
                      </div>

                      {imageUrl && (
                        <div className="relative border rounded-md overflow-hidden">
                          <div className="aspect-[3/4] relative">
                            <Image
                              src={imageUrl || "/placeholder.svg"}
                              alt={`${key} preview`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => handleRemoveImage("category", key)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Product Images */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Upload images for your products. Recommended size: 800x800px.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label htmlFor="productUpload">Upload Product Image</Label>
                      <Input
                        id="productUpload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "product")}
                        disabled={isUploading}
                      />
                    </div>
                    {isUploading && activeTab === "products" && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{uploadProgress}%</span>
                      </div>
                    )}
                  </div>

                  {Object.keys(productImages).length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {Object.entries(productImages).map(([key, imageUrl]) => (
                        <div key={key} className="relative border rounded-md overflow-hidden group">
                          <div className="aspect-square relative">
                            <Image
                              src={(imageUrl as string) || "/placeholder.svg"}
                              alt={`Product ${key}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                            <p className="text-white text-sm font-medium text-center mb-2 line-clamp-2">{key}</p>
                            <Button variant="destructive" size="sm" onClick={() => handleRemoveImage("product", key)}>
                              <X className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No product images uploaded yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={() => {
              toast({
                title: "Changes saved",
                description: "Your image settings have been saved successfully",
              })
              router.push("/")
            }}
          >
            <Check className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
