"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"

export default function ImageLinksPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("home")

  // Image URL states for different sections
  const [homeHeroImage, setHomeHeroImage] = useState("")
  const [aboutHeroImage, setAboutHeroImage] = useState("")
  const [categoryImages, setCategoryImages] = useState({
    "health-wellness": "",
    "beauty-personal-care": "",
    "electronics-gadgets": "",
    "home-living": "",
  })
  const [productImages, setProductImages] = useState<{ [key: string]: string }>({})
  const [newProductId, setNewProductId] = useState("")
  const [newProductImageUrl, setNewProductImageUrl] = useState("")
  const [logoImage, setLogoImage] = useState("")

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  // Load saved image URLs on component mount
  useEffect(() => {
    // In a real app, this would fetch from your backend
    const savedHomeHero = localStorage.getItem("homeHeroImageUrl")
    if (savedHomeHero) setHomeHeroImage(savedHomeHero)

    const savedAboutHero = localStorage.getItem("aboutHeroImageUrl")
    if (savedAboutHero) setAboutHeroImage(savedAboutHero)

    const savedCategoryImages = localStorage.getItem("categoryImageUrls")
    if (savedCategoryImages) setCategoryImages(JSON.parse(savedCategoryImages))

    const savedProductImages = localStorage.getItem("productImageUrls")
    if (savedProductImages) setProductImages(JSON.parse(savedProductImages))

    const savedLogo = localStorage.getItem("logoImageUrl")
    if (savedLogo) setLogoImage(savedLogo)
  }, [])

  // Save image URLs
  const saveImageUrls = () => {
    // Save all image URLs to localStorage
    localStorage.setItem("homeHeroImageUrl", homeHeroImage)
    localStorage.setItem("aboutHeroImageUrl", aboutHeroImage)
    localStorage.setItem("categoryImageUrls", JSON.stringify(categoryImages))
    localStorage.setItem("productImageUrls", JSON.stringify(productImages))
    localStorage.setItem("logoImageUrl", logoImage)

    toast({
      title: "Image links saved",
      description: "Your image links have been saved successfully",
    })
  }

  // Handle category image URL change
  const handleCategoryImageChange = (category: string, url: string) => {
    setCategoryImages((prev) => ({
      ...prev,
      [category]: url,
    }))
  }

  // Add product image URL
  const handleAddProductImage = () => {
    if (!newProductId || !newProductImageUrl) {
      toast({
        title: "Missing information",
        description: "Please enter both product ID and image URL",
        variant: "destructive",
      })
      return
    }

    setProductImages((prev) => ({
      ...prev,
      [newProductId]: newProductImageUrl,
    }))

    setNewProductId("")
    setNewProductImageUrl("")

    toast({
      title: "Product image added",
      description: `Image URL added for product ID: ${newProductId}`,
    })
  }

  // Remove product image URL
  const handleRemoveProductImage = (productId: string) => {
    setProductImages((prev) => {
      const updated = { ...prev }
      delete updated[productId]
      return updated
    })

    toast({
      title: "Product image removed",
      description: `Image URL removed for product ID: ${productId}`,
    })
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Image Link Management</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="home">Home Page</TabsTrigger>
            <TabsTrigger value="about">About Page</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="logo">Logo</TabsTrigger>
          </TabsList>

          {/* Home Page Image */}
          <TabsContent value="home">
            <Card>
              <CardHeader>
                <CardTitle>Home Page Hero Image</CardTitle>
                <CardDescription>
                  Enter the URL for the home page hero section. Recommended size: 1920x1080px.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="homeHeroUrl">Image URL</Label>
                    <Input
                      id="homeHeroUrl"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={homeHeroImage}
                      onChange={(e) => setHomeHeroImage(e.target.value)}
                    />
                  </div>

                  {homeHeroImage && (
                    <div className="border rounded-md overflow-hidden">
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={homeHeroImage || "/placeholder.svg"}
                          alt="Home hero preview"
                          fill
                          className="object-cover"
                          onError={() => {
                            toast({
                              title: "Image error",
                              description: "The image URL could not be loaded",
                              variant: "destructive",
                            })
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Page Image */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Page Hero Image</CardTitle>
                <CardDescription>
                  Enter the URL for the about page hero section. Recommended size: 1920x800px.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aboutHeroUrl">Image URL</Label>
                    <Input
                      id="aboutHeroUrl"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={aboutHeroImage}
                      onChange={(e) => setAboutHeroImage(e.target.value)}
                    />
                  </div>

                  {aboutHeroImage && (
                    <div className="border rounded-md overflow-hidden">
                      <div className="aspect-[16/9] relative">
                        <Image
                          src={aboutHeroImage || "/placeholder.svg"}
                          alt="About hero preview"
                          fill
                          className="object-cover"
                          onError={() => {
                            toast({
                              title: "Image error",
                              description: "The image URL could not be loaded",
                              variant: "destructive",
                            })
                          }}
                        />
                      </div>
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
                      Enter the URL for the {key.replace("-", " & ")} category. Recommended size: 600x800px.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${key}Url`}>Image URL</Label>
                        <Input
                          id={`${key}Url`}
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={imageUrl}
                          onChange={(e) => handleCategoryImageChange(key, e.target.value)}
                        />
                      </div>

                      {imageUrl && (
                        <div className="border rounded-md overflow-hidden">
                          <div className="aspect-[3/4] relative">
                            <Image
                              src={imageUrl || "/placeholder.svg"}
                              alt={`${key} preview`}
                              fill
                              className="object-cover"
                              onError={() => {
                                toast({
                                  title: "Image error",
                                  description: "The image URL could not be loaded",
                                  variant: "destructive",
                                })
                              }}
                            />
                          </div>
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
                <CardDescription>
                  Enter URLs for your product images. Use the product ID as the reference. Recommended size: 800x800px.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productId">Product ID</Label>
                      <Input
                        id="productId"
                        type="text"
                        placeholder="1"
                        value={newProductId}
                        onChange={(e) => setNewProductId(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productImageUrl">Image URL</Label>
                      <Input
                        id="productImageUrl"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={newProductImageUrl}
                        onChange={(e) => setNewProductImageUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddProductImage}>Add Product Image</Button>

                  {Object.keys(productImages).length > 0 ? (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Saved Product Images</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(productImages).map(([productId, imageUrl]) => (
                          <div key={productId} className="border rounded-md overflow-hidden">
                            <div className="aspect-square relative">
                              <Image
                                src={imageUrl || "/placeholder.svg"}
                                alt={`Product ${productId}`}
                                fill
                                className="object-cover"
                                onError={() => {
                                  toast({
                                    title: "Image error",
                                    description: `The image URL for product ${productId} could not be loaded`,
                                    variant: "destructive",
                                  })
                                }}
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => handleRemoveProductImage(productId)}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                            <div className="p-2 bg-muted">
                              <p className="text-sm font-medium">Product ID: {productId}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No product images added yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logo">
            <Card>
              <CardHeader>
                <CardTitle>Website Logo</CardTitle>
                <CardDescription>
                  Enter the URL for your website logo. Recommended size: 200x200px with transparent background.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={logoImage || ""}
                      onChange={(e) => setLogoImage(e.target.value)}
                    />
                  </div>

                  {logoImage && (
                    <div className="border rounded-md overflow-hidden p-4 flex justify-center">
                      <div className="relative h-40 w-40">
                        <Image
                          src={logoImage || "/placeholder.svg"}
                          alt="Logo preview"
                          fill
                          className="object-contain"
                          onError={() => {
                            toast({
                              title: "Image error",
                              description: "The logo URL could not be loaded",
                              variant: "destructive",
                            })
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={saveImageUrls}>
            <Check className="h-4 w-4 mr-2" />
            Save All Image Links
          </Button>
        </div>
      </div>
    </div>
  )
}
