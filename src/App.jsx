import React, { useState } from "react"
import { BookOpen, Award, ArrowRight, Users } from "lucide-react"
import { blogPosts } from "./data/mockData"
import { Headers } from "./components/Headers"
import { Footer } from "./components/Footer"
import Hero from "./components/Hero"
import Category from "./components/Categories"

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory)

  const featuredPost = blogPosts.find((post) => post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      {/* Header */}
      <Headers />

      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Scholarships Listed</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                10,000+
              </div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-600">Partner Universities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-12 flex flex-col justify-center text-white">
                  <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4 w-fit">
                    <Award className="w-4 h-4" />
                    <span>Featured Article</span>
                  </div>
                  <h3 className="text-4xl font-bold mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-cyan-100 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">{featuredPost.author}</div>
                      <div className="text-sm text-cyan-200">
                        {featuredPost.date} • {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <button className="bg-white text-cyan-600 px-8 py-3 rounded-full font-medium hover:shadow-xl transition-all w-fit flex items-center space-x-2">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="h-full min-h-96">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter Start */}
      <Category />
      {/* Category Filter End */}

      {/* Blog Grid */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-cyan-600 px-4 py-1 rounded-full text-sm font-medium capitalize">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {post.author.charAt(0)}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {post.author}
                        </div>
                        <div className="text-gray-500 text-xs">{post.date}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{post.readTime}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Book a free consultation with our expert advisors and take the first
            step towards your dream education.
          </p>
          <button className="bg-white text-cyan-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
            Schedule Free Consultation
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
