"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import ScrollAnimation from "@/components/scroll-animation"
import { allProducts } from "@/data/products"

export default function CollectionsPage() {
  const [activeTab, setActiveTab] = useState("seasonal")

  // Define collections
  const collections = {
    seasonal: {
      title: "Seasonal Collections",
      description: "Discover our latest seasonal collections featuring trending products for every season.",
      items: allProducts.slice(0, 4),
      image: "/placeholder.svg?height=600&width=800",
    },
    bestsellers: {
      title: "Bestsellers",
      description: "Our most popular products loved by customers around the world.",
      items: allProducts.slice(2, 6),
      image: "/placeholder.svg?height=600&width=800",
    },
    newArrivals: {
      title: "New Arrivals",
      description: "The latest additions to our catalog, fresh and exciting products just for you.",
      items: allProducts.slice(4, 8),
      image: "/placeholder.svg?height=600&width=800",
    },
    exclusive: {
      title: "Exclusive Collection",
      description: "Limited edition products available only at StyleShop.",
      items: [allProducts[0], allProducts[3], allProducts[5], allProducts[7]],
      image: "/placeholder.svg?height=600&width=800",
    },
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h1 className="text-4xl font-bold mb-2">Our Collections</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Explore our carefully curated collections featuring the best products across all categories.
          </p>
        </ScrollAnimation>

        <Tabs defaultValue="seasonal" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <ScrollAnimation>
            <TabsList className="w-full justify-start overflow-auto py-2">
              <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
              <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
              <TabsTrigger value="newArrivals">New Arrivals</TabsTrigger>
              <TabsTrigger value="exclusive">Exclusive</TabsTrigger>
            </TabsList>
          </ScrollAnimation>

          {Object.entries(collections).map(([key, collection]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <ScrollAnimation>
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{collection.title}</h2>
                    <p className="text-muted-foreground mb-6">{collection.description}</p>
                    <Button asChild>
                      <Link href={`/products?collection=${key}`}>
                        View All Products <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation direction="right">
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </ScrollAnimation>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {collection.items.map((product, index) => (
                  <ScrollAnimation key={product.id} delay={0.1 * index}>
                    <Link href={`/products/${product.id}`} className="group">
                      <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-muted-foreground">{product.category}</p>
                      <p className="font-bold mt-1">{product.price.toFixed(2)} birr</p>
                    </Link>
                  </ScrollAnimation>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
