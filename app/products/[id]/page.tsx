"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import ScrollAnimation from "@/components/scroll-animation"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { allProducts } from "@/data/products"
import { useToast } from "@/components/ui/use-toast"
import ContactModal from "@/components/contact-modal"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("black")
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const { toast } = useToast()

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const productId = Number.parseInt(params.id)
  const isInWishlist = wishlist.includes(productId)

  // Find the product from our data
  const product = allProducts.find((p) => p.id === productId) || {
    id: productId,
    name: "Product Name",
    price: 299.99,
    description: "Product description goes here.",
    colors: [
      { id: "black", name: "Black" },
      { id: "white", name: "White" },
      { id: "blue", name: "Blue" },
    ],
    details: "Detailed product information goes here.",
    category: "Category",
  }

  const incrementQuantity = () => setQuantity(quantity + 1)
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1)

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image || "/placeholder.svg",
      quantity: quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    // Navigate to phone number for direct purchase
    window.location.href = "tel:+251939786548"

    toast({
      title: "Calling to complete your purchase",
      description: "You'll be connected with our sales team to finalize your order.",
    })
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link href="/products" className="flex items-center text-sm mb-8 hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <ScrollAnimation>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden border">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollAnimation>

          {/* Product Info */}
          <ScrollAnimation direction="left">
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-2xl font-bold mt-2">{product.price.toFixed(2)} birr</p>
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              {/* Color Selection */}
              <div className="space-y-2">
                <Label htmlFor="color" className="text-base">
                  Color
                </Label>
                <RadioGroup
                  id="color"
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex items-center gap-2"
                >
                  {(
                    product.colors || [
                      { id: "black", name: "Black" },
                      { id: "white", name: "White" },
                      { id: "blue", name: "Blue" },
                    ]
                  ).map((color) => (
                    <Label
                      key={color.id}
                      htmlFor={`color-${color.id}`}
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
                    >
                      <RadioGroupItem id={`color-${color.id}`} value={color.id} />
                      {color.name}
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-base">
                  Quantity
                </Label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    className="rounded-r-none"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="h-10 w-12 flex items-center justify-center border-y">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    className="rounded-l-none"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1" onClick={toggleWishlist}>
                  <Heart className={`mr-2 h-5 w-5 ${isInWishlist ? "fill-primary" : ""}`} />
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Buy Now Button */}
              <Button
                size="lg"
                variant="default"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleBuyNow}
              >
                <Phone className="mr-2 h-5 w-5" />
                Buy Now
              </Button>

              <Separator className="my-6" />

              {/* Product Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Product Details</h2>
                <p className="text-muted-foreground">{product.details}</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* Contact Modal */}
        <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      </div>
    </div>
  )
}
