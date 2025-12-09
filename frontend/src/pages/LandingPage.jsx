import React from 'react';
import { useNavigate } from 'react-router';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-300 flex flex-col font-sans">
      {/* Navbar Container */}
      {/* <div className="absolute top-0 w-full z-50">
        <div className="navbar max-w-7xl mx-auto px-6 py-4">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FitTrack
            </a>
          </div>
          <div className="flex-none gap-4">
            <button 
              onClick={() => navigate('/login')} 
              className="btn btn-ghost hover:bg-base-content/10"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className="btn btn-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              Get Started
            </button>
          </div>
        </div>
      </div> */}

      {/* Hero Section */}
      <div className="hero min-h-screen relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-base-300 to-base-300 opacity-50 blur-3xl"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="hero-content text-center relative z-10 max-w-3xl px-4">
          <div className="flex flex-col items-center">
            <div className="badge badge-outline badge-primary mb-6 py-3 px-4 text-sm font-medium backdrop-blur-sm">
              ✨ Redefine Your Fitness Journey
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Transform Your Body <br/>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Master Your Life
              </span>
            </h1>
            <p className="py-6 text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of fitness tracking. Seamlessly log workouts, 
              monitor nutrition, and visualize your progress with our minimal, intelligent dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button 
                onClick={() => navigate('/signup')} 
                className="btn btn-primary btn-lg px-8 shadow-xl shadow-primary/30 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start Free Trial
              </button>
              <button 
                className="btn btn-outline btn-lg px-8 hover:bg-base-content/5 transition-colors"
              >
                Learn More
              </button>
            </div>
            
            {/* Stats / Social Proof */}
            <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16 border-t border-base-content/10 pt-8 w-full">
              <div>
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-base-content/60">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">5M+</div>
                <div className="text-sm text-base-content/60">Workouts Logged</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">4.9/5</div>
                <div className="text-sm text-base-content/60">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-base-200/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why FitTrack?</h2>
            <p className="text-base-content/60 text-lg">Everything you need to reach your goals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-100/50 backdrop-blur-md border border-base-content/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl">
              <div className="card-body items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 016 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                  </svg>
                </div>
                <h3 className="card-title mb-2">Smart Tracking</h3>
                <p className="text-base-content/70">Effortlessly log workouts and meals with our intuitive, fast interface.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-100/50 backdrop-blur-md border border-base-content/5 hover:border-secondary/50 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl">
              <div className="card-body items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                  </svg>
                </div>
                <h3 className="card-title mb-2">Deep Analytics</h3>
                <p className="text-base-content/70">Visualize your progress with beautiful, easy-to-understand charts and insights.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-100/50 backdrop-blur-md border border-base-content/5 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl">
              <div className="card-body items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <h3 className="card-title mb-2">Goal Crushing</h3>
                <p className="text-base-content/70">Set personalized goals and get the motivation you need to smash them.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content rounded">
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div> 
        <div>
          <div className="grid grid-flow-col gap-4 text-2xl">
            <a><i className="fa-brands fa-twitter"></i></a> 
            <a><i className="fa-brands fa-youtube"></i></a> 
            <a><i className="fa-brands fa-facebook-f"></i></a>
          </div>
        </div> 
        <div className="mt-4">
          <p>Copyright © 2024 - All right reserved by FitTrack Industries Ltd</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
