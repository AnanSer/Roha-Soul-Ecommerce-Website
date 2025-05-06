"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Package, User, Heart, Settings, LogOut, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import ScrollAnimation from "@/components/scroll-animation"

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      date: "May 1, 2023",
      status: "Delivered",
      total: 1299.97,
      items: 3,
    },
    {
      id: "ORD-002",
      date: "April 15, 2023",
      status: "Processing",
      total: 899.99,
      items: 1,
    },
    {
      id: "ORD-003",
      date: "March 22, 2023",
      status: "Delivered",
      total: 2499.98,
      items: 4,
    },
  ]

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h1 className="text-4xl font-bold mb-8">My Account</h1>
        </ScrollAnimation>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <ScrollAnimation className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant={activeTab === "orders" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button
                    variant={activeTab === "wishlist" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </ScrollAnimation>

          {/* Main Content */}
          <ScrollAnimation className="md:col-span-3" direction="right">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "profile" && "Personal Information"}
                  {activeTab === "orders" && "Order History"}
                  {activeTab === "wishlist" && "My Wishlist"}
                  {activeTab === "settings" && "Account Settings"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "profile" && "Manage your personal information"}
                  {activeTab === "orders" && "View and track your orders"}
                  {activeTab === "wishlist" && "Products you've saved for later"}
                  {activeTab === "settings" && "Update your account preferences"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h3>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                        <p className="font-medium">+251 912 121 212</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Member Since</h3>
                        <p className="font-medium">May 3, 2023</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Default Shipping Address</h3>
                      <p className="font-medium">123 Main Street, Addis Ababa, Ethiopia</p>
                    </div>

                    <Button>Edit Profile</Button>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="space-y-6">
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                              <div>
                                <h3 className="font-medium">Order #{order.id}</h3>
                                <p className="text-sm text-muted-foreground">{order.date}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                            <div className="flex flex-wrap justify-between items-center gap-4">
                              <div className="flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{order.items} items</span>
                              </div>
                              <div className="font-bold">{order.total.toFixed(2)} birr</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
                        <Button asChild>
                          <Link href="/products">Start Shopping</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "wishlist" && (
                  <div className="space-y-6">
                    <Link href="/wishlist">
                      <Button>View My Wishlist</Button>
                    </Link>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                        </div>
                        <Button variant="outline">Manage</Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Password</h3>
                          <p className="text-sm text-muted-foreground">Change your password</p>
                        </div>
                        <Button variant="outline">Update</Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Payment Methods</h3>
                          <p className="text-sm text-muted-foreground">Manage your payment methods</p>
                        </div>
                        <Button variant="outline">Manage</Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Delete Account</h3>
                          <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                        </div>
                        <Button variant="destructive">Delete</Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}
