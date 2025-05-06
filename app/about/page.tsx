"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Clock, Users } from "lucide-react";
import ScrollAnimation from "@/components/scroll-animation";
import { useImageUrls } from "@/components/image-url-provider";

export default function AboutPage() {
  const { getImageUrl } = useImageUrls();

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={"/about.jpg"}
            alt="About us hero"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            className="max-w-3xl mx-auto text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4">
              About Roha Soul Online Shop
            </h1>
            <p className="text-xl">
              Delivering trusted online shopping experiences since day one
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Roha Soul Online Shop was launched to make quality products
                  accessible to everyone. What started as a small online store
                  has grown into a trusted eCommerce brand, serving customers
                  across the globe with reliable service and great prices.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our journey has been defined by a commitment to quality,
                  sustainability, and customer satisfaction. We believe that
                  fashion should be both beautiful and responsible, which is why
                  we carefully select our materials and manufacturing partners.
                </p>
                <p className="text-muted-foreground">
                  Our journey is driven by a commitment to quality,
                  affordability, and customer satisfaction. We believe shopping
                  should be easy, reliable, and rewarding — that’s why we
                  partner with trusted suppliers and always put our customers
                  first
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="left">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={"/logo.jpg"}
                  alt="Our story"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimation>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-primary">6+</div>
                <p className="text-xl">Years of Experience</p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-primary">
                  1200+
                </div>
                <p className="text-xl">Happy Customers</p>
              </div>
            </ScrollAnimation>

            {/* <ScrollAnimation delay={0.4}>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-primary">20+</div>
                <p className="text-xl">Countries Served</p>
              </div>
            </ScrollAnimation> */}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimation>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Quality</h3>
                <p className="text-muted-foreground">
                  We're committed to providing the highest quality products.
                  Each item is carefully crafted using premium materials and
                  undergoes rigorous quality checks.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Community</h3>
                <p className="text-muted-foreground">
                  We believe in building a community of fashion enthusiasts. Our
                  customers are part of our family, and we value their feedback
                  and support.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.4}>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're dedicated to reducing our environmental impact. From
                  sourcing sustainable materials to implementing eco-friendly
                  practices, we're committed to a better future.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-center mb-12">
              Meet Our Team
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Daniel",
                role: "Founder & CEO",
                imageKey: "team-daniel",
                // image: "/team-daniel.jpg",
              },
              {
                name: "Solomon",
                role: "Creative Director",
                imageKey: "team-solomon",
                // image: "/team-solomon.jpg",
              },
              {
                name: "Abreham",
                role: "Digital Marketer",
                imageKey: "team-abreham",
                image: "/abrsh.png",
              },
              {
                name: "Yabsera",
                role: "Delivery ",
                imageKey: "team-martha",
                // image: "/team-martha.jpg",
              },
            ].map((member, index) => (
              <ScrollAnimation key={member.name} delay={0.1 * index}>
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border">
                  <div className="relative h-64">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
