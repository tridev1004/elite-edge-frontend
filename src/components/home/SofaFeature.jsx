import { SofaIcon as Couch, Leaf, Recycle } from 'lucide-react'

export default function SofaFeatureSection() {
  return (
    <section className="py-24 bg-gray-100 " style={{ marginTop: "5rem" }}>
      <div className="container px-6 text-center ">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Comfort Meets Style
        </h2>
        <p className="max-w-xl mx-auto text-lg text-gray-600 mb-12 text-muted">
          We can also provide a design of your choice and bring it to life for you.
        </p>

        <div className="grid gap-8 md:grid-cols-3" style={{ display: "flex", gap: "20rem", marginTop: "5rem" }}>
          <FeatureCard
            icon={<Couch style={{ height: "112px", width: "112px", marginBottom: "1rem", color: "#f97316" }} />}
            title="Supreme Comfort"
            description="Relax in style with our plush cushioning."
          />
          <FeatureCard
            icon={<Leaf style={{ height: "64px", width: "64px", marginBottom: "1rem", color: "#10b981" }} />}
            title="Eco-Friendly Materials"
            description="Sustainably sourced fabrics and woods."
          />
          <FeatureCard
            icon={<Recycle style={{ height: "64px", width: "64px", marginBottom: "1rem", color: "#3b82f6" }} />}
            title="5-Year Warranty"
            description="A decade-long guarantee on quality."
          />
        </div>

      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      {icon}
      <h3 className="text-lg font-semibold text-gray-800 mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  )
}
