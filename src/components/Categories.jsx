import React from "react"
import { BookOpen, Award, TrendingUp, Bell } from "lucide-react"

export default function Category() {
  const [selectedCategory, setSelectedCategory] = React.useState("all")

  const categories = [
    { id: "all", name: "All Posts", icon: BookOpen },
    { id: "scholarships", name: "Scholarships", icon: Award },
    { id: "updates", name: "School Updates", icon: Bell },
    { id: "guides", name: "Guides", icon: TrendingUp },
  ]
  return (
    <>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{cat.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
