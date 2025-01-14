import { SofaIcon as Couch, Leaf, Recycle } from "lucide-react";
import "./styles.css";

export default function SofaFeatureSection() {
  return (
    <section className="sofa-feature-section">
      <div className="container px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Comfort Meets Style
        </h2>
        <p className="text-lg text-muted">
          We can also provide a design of your choice and bring it to life for
          you.
        </p>

        <div className="sofa-feature-grid">
          <FeatureCard
            icon={
              <Couch
                className="icon"
                style={{
                  color: "#f97316",
                  height: "112px",
                  width: "112px",
                  marginBottom: "1rem",
                }}
              />
            }
            title="Supreme Comfort"
            description="Relax in style with our plush cushioning."
          />
          <FeatureCard
            icon={
              <Leaf
                className="icon"
                style={{
                  color: "#10b981",
                  height: "112px",
                  width: "112px",
                  marginBottom: "1rem",
                }}
              />
            }
            title="Eco-Friendly Materials"
            description="Sustainably sourced fabrics and woods."
          />
          <FeatureCard
            icon={
              <Recycle
                className="icon"
                style={{
                  color: "#3b82f6",
                  height: "112px",
                  width: "112px",
                  marginBottom: "1rem",
                }}
              />
            }
            title="5-Year Warranty"
            description="A decade-long guarantee on quality."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
