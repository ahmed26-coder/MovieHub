"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Toaster, toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isEmpty = Object.values(formData).some((val) => val.trim() === "")
    if (isEmpty) {
      toast.error("Please fill in all fields.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      toast.success("Message sent successfully!")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsLoading(false)
    }, 1000)
  }

  const disabled = isLoading

  return (
    <div className="container mx-auto px-4 py-12">
      <Toaster position="top-center" richColors />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Have questions, suggestions, or need support? We&#39;d love to hear from you!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <Card className="bg-slate-800/50 border-slate-700 pt-4">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {["firstName", "lastName", "email", "subject"].map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (s) => s.toUpperCase())}
                  </label>
                  <Input
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    placeholder={
                      field === "email"
                        ? "john@example.com"
                        : field === "firstName"
                          ? "John"
                          : field === "lastName"
                            ? "Doe"
                            : "How can we help you?"
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    disabled={disabled}
                  />
                </div>
              ))}

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Message</label>
                <Textarea
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  className="bg-slate-700 border-slate-600 h-40 text-white resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </div>

              <Button
                type="submit"
                disabled={disabled}
                className={`w-full flex justify-center items-center gap-2 transition-all ${isLoading
                    ? "bg-purple-700 cursor-wait"
                    : "bg-purple-600 hover:bg-purple-700"
                  }`}
              >
                {isLoading ? (
                  <>
                    <span className="loader border-white border-t-transparent border-2 rounded-full w-4 h-4 animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-8">
          <Card className="bg-slate-800/50 border-slate-700 py-4">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="text-purple-400 mt-1" size={20} />
                <div>
                  <h3 className="text-white font-medium">Email</h3>
                  <p className="text-gray-300">support@moviehub.com</p>
                  <p className="text-gray-300">info@moviehub.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-purple-400 mt-1" size={20} />
                <div>
                  <h3 className="text-white font-medium">Phone</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-300">+1 (555) 987-6543</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-purple-400 mt-1" size={20} />
                <div>
                  <h3 className="text-white font-medium">Address</h3>
                  <p className="text-gray-300">123 Movie Street<br />Hollywood, CA 90210<br />United States</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-purple-400 mt-1" size={20} />
                <div>
                  <h3 className="text-white font-medium">Business Hours</h3>
                  <p className="text-gray-300">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-3">Quick Support</h3>
              <p className="text-gray-300 mb-4">
                Need immediate assistance? Check out our FAQ section or reach out to our support team.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-300 hover:text-white hover:bg-purple-500/20 bg-transparent"
                >
                  View FAQ
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 hover:text-white">Live Chat</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
