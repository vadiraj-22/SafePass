import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative mt-8 mb-8 md:mt-0 md:mb-0 pt-32 pb-16 md:pt-24 md:pb-16">
      <div className="animation-delay-8 animate-fadeIn flex flex-col items-center justify-center px-4 text-center">
        <div className="z-10 mb-10 md:mb-6">
          <div className="relative flex items-center whitespace-nowrap rounded-full border bg-gray-900/50 backdrop-blur-sm border-gray-800 px-3 py-1 text-xs leading-6 text-gray-300 hover:border-purple-500/50 transition-all duration-300">
            <Shield className="h-5 p-1 text-purple-400" /> 
            <span className="font-mono">Introducing SafePass.</span>
            <a
              href="/features"
              className="hover:text-purple-400 ml-1 flex items-center font-semibold transition-colors font-mono"
            >
              <div className="absolute inset-0 flex" aria-hidden="true" />
              Explore{" "}
              <span aria-hidden="true">
                <ArrowRight className="h-4 w-4 ml-1" />
              </span>
            </a>
          </div>
        </div>
        
        <div className="mb-16 md:mb-10">
          <div className="px-2">
            <div className="relative mx-auto h-full max-w-5xl border border-gray-800 p-6 md:p-8 lg:p-12 bg-gray-900/50 backdrop-blur-sm rounded-2xl hover:border-purple-500/50 transition-all duration-300">
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-400"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-400"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-purple-400"></div>
              
              <h1 className="cybersec-title select-none px-2 md:px-3 py-2 text-center text-xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Your complete platform for Password Security.
              </h1>
              <div className="flex items-center justify-center gap-1 mt-8 md:mt-4">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400"></span>
                </span>
                <p className="text-xs text-purple-400 font-semibold font-mono">SYSTEM ONLINE</p>
              </div>
            </div>
          </div>
          
          <h2 className="mt-8 md:mt-8 text-base md:text-xl lg:text-2xl text-white font-mono px-4">
            Welcome to your security playground! We're{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent font-bold cybersec-title">SafePass</span>
          </h2>
          <p className="mx-auto mb-8 md:mb-8 mt-4 md:mt-4 max-w-2xl px-6 text-xs md:text-base text-gray-400 lg:text-lg">
            We craft military-grade password security tools and provide resources
            to empower your digital safety.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-4 px-4">
            <a href="/password-generator" className="w-full sm:w-auto">
              <Button variant="default" size="lg" className="font-mono w-full sm:w-auto">
                START NOW
              </Button>
            </a>
            <a href="/about" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="font-mono w-full sm:w-auto">
                LEARN MORE
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}