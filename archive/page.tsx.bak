import Image from "next/image";
import AgentPulse from "./components/AgentPulse";
import { APP_NAME, features, steps } from "./constants";
import Footer from "./components/Footer";
import YouTubeVideoForm from "./components/YouTubeVideoForm";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">        
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-10 text-center mb-12">
            {/* <AgentPulse size="large" color="purple" /> */}
            
            <h2 className="text-4xl md:text-6xl font-bold text-gray-600 mb-6">
            Transform your video content with AI-powered analysis, {" "}
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              transcription, and insights. Get started in seconds.
              </span>
            </h2>

            <h1 className="text-3xl md:text-6xl font-bold text-purple-900 mb-6">{APP_NAME}</h1>

            {/* YouTube video Form */}
            <YouTubeVideoForm />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Unlock Powerful Features for {" "}            
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Content Creators
              </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature cards */}
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-500 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.iconBg}`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Meet your automated AI agent in 3 Simple Steps</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-500">{step.description}</p>
                  </div>
                )
              })}
            </div>
        </div>
      </section>

      {/* Footer section */}
      <Footer />
    </div>
  );
}
