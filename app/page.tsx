import Image from 'next/image';
import { BarChart2, Clock, Users, Zap, CheckCircle } from 'lucide-react';
import LogInButton from './components/logIn';
import FreeTrialButton from './components/freeTrial';

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">Empower Your Team with Crystal</h1>
          <p className="text-xl text-base-content mb-8">Accurate estimates. Data-driven insights. Seamless collaboration.</p>
          <FreeTrialButton />
        </section>

        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-primary mb-6">Transform Your Project Planning</h2>
            <ul className="space-y-4">
              {[
                { icon: Clock, text: "Reduce uncertainty with data-driven estimates" },
                { icon: Users, text: "Enhance team collaboration and alignment" },
                { icon: Zap, text: "Accelerate decision-making processes" },
                { icon: CheckCircle, text: "Improve project success rates" },
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <item.icon className="h-6 w-6 text-success mr-3" />
                  <span className="text-base-content">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-64 md:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Team collaborating on a project"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-primary text-center mb-8">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Estimations",
                description: "Leverage machine learning for accurate project timelines and resource allocation.",
              },
              {
                title: "Historical Data Integration",
                description: "Learn from past projects to refine future estimates and avoid repeated mistakes.",
              },
              {
                title: "Collaborative Planning",
                description: "Engage your entire team in the estimation process for better alignment and buy-in.",
              },
            ].map((feature, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold text-primary mb-6">Ready to Revolutionize Your Project Estimations?</h2>
          <p className="text-xl text-base-content mb-8">Join thousands of teams already benefiting from Crystal's powerful insights.</p>
        </section>
      </main>

      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <div>
          <p>&copy; 2024 Crystal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}