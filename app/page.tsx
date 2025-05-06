"use client";

import type React from "react";

import { Input } from "@/components/ui/input";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  TrendingUp,
  Truck,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScrollAnimation from "@/components/scroll-animation";
import { useWishlist } from "@/context/wishlist-context";
import { useCart } from "@/context/cart-context";
import { useImageUrls } from "@/components/image-url-provider";
import { allProducts } from "@/data/products";

export default function Home() {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlist();
  const { addToCart } = useCart();
  const { getImageUrl } = useImageUrls();

  // Get 4 featured products
  const featuredProducts = allProducts.slice(0, 4);

  const toggleWishlist = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getImageUrl("product", product.id.toString()) || product.image,
      quantity: 1,
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-2xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Elevate Your Shopping Experience
            </h1>
            <p className="text-xl mb-8">
              Discover the latest trends in fashion and accessories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-center mb-12">
              Shop by Category
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ScrollAnimation delay={0.1}>
              <Link href="/products?category=health-wellness" className="group">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src={"/health.png"}
                    alt="Health & Wellness"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">
                      Health & Wellness
                    </h3>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <Link
                href="/products?category=beauty-personal-care"
                className="group"
              >
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src={"/cosmotics.jpeg"}
                    alt="Beauty & Personal Care"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">
                      Beauty & Personal Care
                    </h3>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>

            <ScrollAnimation delay={0.3}>
              <Link
                href="/products?category=electronics-gadgets"
                className="group"
              >
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src={"/electronics.jpeg"}
                    alt="Electronics & Gadgets"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">
                      Electronics & Gadgets
                    </h3>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>

            <ScrollAnimation delay={0.4}>
              <Link href="/products?category=home-living" className="group">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src={"/home.jpg"}
                    alt="Home & Living"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">
                      Home & Living
                    </h3>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Button variant="ghost" asChild>
                <Link href="/products" className="flex items-center gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ScrollAnimation key={product.id} delay={0.2 * index}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative h-64">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        onClick={(e) => toggleWishlist(e, product.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isInWishlist(product.id)
                              ? "fill-primary text-primary"
                              : ""
                          }`}
                        />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        {product.category}
                      </div>
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="font-bold">
                          {product.price.toFixed(2)} birr
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Us
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimation>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
                <p className="text-muted-foreground">
                  Free shipping on all orders over 1000 birr
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                <p className="text-muted-foreground">
                  Handpicked premium quality products
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.4}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Latest Trends</h3>
                <p className="text-muted-foreground">
                  Stay updated with the latest fashion trends
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollAnimation>
              <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
              <p className="mb-8">
                Subscribe to our newsletter and get 10% off your first purchase
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Your email address"
                  className="bg-primary-foreground text-primary"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  );
}
