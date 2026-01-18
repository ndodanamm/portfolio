
import React from 'react';
import { UserInput, RefinedPortfolio, CISet } from '../types';
import { CI_SETS } from '../constants';

interface Props {
  data: UserInput;
  refined: RefinedPortfolio;
}

const PortfolioPreview: React.FC<Props> = ({ data, refined }) => {
  const ciSet = (typeof data.ciSetId === 'number' ? CI_SETS.find(c => c.id === data.ciSetId) : CI_SETS[0]) || CI_SETS[0];
  
  const styles = {
    primary: ciSet.colors[0],
    secondary: ciSet.colors[1],
    accent: ciSet.colors[3],
    light: ciSet.colors[4],
    headingFont: ciSet.fonts[0],
    bodyFont: ciSet.fonts[1]
  };

  return (
    <div className="bg-white min-h-screen print-exact" style={{ fontFamily: styles.bodyFont }}>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center px-12 text-white overflow-hidden print:h-screen print:flex print:items-center print:justify-center" style={{ backgroundColor: styles.primary }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
            <rect width="100" height="100" fill="url(#pattern)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl print:text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-6" style={{ fontFamily: styles.headingFont }}>
            {data.businessName}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 opacity-90 max-w-2xl leading-relaxed print:mx-auto">
            {refined.hero.subtitle}
          </p>
          <div className="h-1 w-24 mb-8 print:mx-auto" style={{ backgroundColor: styles.accent }}></div>
          <p className="text-lg opacity-80 max-w-xl print:mx-auto">
            {refined.hero.description}
          </p>
        </div>
        <div className="absolute bottom-12 right-12 text-right opacity-40 uppercase tracking-[0.3em] text-xs font-bold print:right-0 print:left-0 print:text-center">
          {data.niche} &bull; {data.location}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-12 grid grid-cols-1 md:grid-cols-2 gap-20 bg-slate-50 print:bg-white print:py-16">
        <div className="break-inside-avoid">
          <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: styles.headingFont, color: styles.primary }}>Our Vision & Mission</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Vision</h3>
              <p className="text-xl leading-relaxed text-slate-700">{refined.about.vision}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Mission</h3>
              <p className="text-xl leading-relaxed text-slate-700">{refined.about.mission}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center border-l-4 pl-12 break-inside-avoid" style={{ borderColor: styles.accent }}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">The Nexa Value</h3>
          <p className="text-3xl font-medium leading-tight italic" style={{ color: styles.secondary }}>
            "{refined.about.valueProp}"
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-12 print:py-16">
        <div className="flex items-center gap-6 mb-16">
          <h2 className="text-4xl font-bold" style={{ fontFamily: styles.headingFont, color: styles.primary }}>Core Capabilities</h2>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {refined.services.map((service, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-xl hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 bg-white break-inside-avoid print:border-slate-200">
              <div className="text-3xl mb-6 opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: styles.accent }}>0{i+1}</div>
              <h4 className="text-xl font-bold mb-4" style={{ color: styles.primary }}>{service.title}</h4>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-12 text-white print:py-16 print:text-slate-900 print:bg-slate-50" style={{ backgroundColor: styles.secondary }}>
        <h2 className="text-4xl font-bold mb-16 text-center" style={{ fontFamily: styles.headingFont }}>Strategic Workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {refined.process.map((step, i) => (
            <div key={i} className="relative break-inside-avoid">
              <div className="text-5xl font-black mb-6 opacity-20 print:text-slate-200" style={{ fontFamily: styles.headingFont }}>{i+1}</div>
              <p className="text-lg font-medium leading-relaxed">{step}</p>
              {i < refined.process.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px bg-white/20 print:bg-slate-200"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Advantages / Why Us */}
      <section className="py-24 px-12 grid grid-cols-1 md:grid-cols-2 gap-20 print:py-16">
        <div className="break-inside-avoid">
          <h2 className="text-4xl font-bold mb-10" style={{ fontFamily: styles.headingFont, color: styles.primary }}>Competitive Advantages</h2>
          <ul className="space-y-6">
            {refined.advantages.map((adv, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: styles.accent }}></span>
                <span className="text-lg text-slate-700">{adv}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-50 p-12 rounded-3xl break-inside-avoid print:bg-white print:border print:border-slate-100">
          <h2 className="text-4xl font-bold mb-10" style={{ fontFamily: styles.headingFont, color: styles.primary }}>Why Choose Us</h2>
          <div className="space-y-8">
            {refined.whyUs.map((reason, i) => (
              <div key={i} className="flex gap-6">
                <div className="text-2xl font-bold opacity-30" style={{ color: styles.primary }}>✓</div>
                <p className="text-lg text-slate-600">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="py-24 px-12 border-t border-slate-100 flex flex-col items-center text-center break-inside-avoid print:py-16">
        <h2 className="text-5xl font-black mb-8" style={{ fontFamily: styles.headingFont, color: styles.primary }}>
          Ready to Elevate?
        </h2>
        <p className="text-2xl mb-12 text-slate-500 max-w-2xl leading-relaxed">
          {refined.contact.text}
        </p>
        
        <div className="flex flex-wrap justify-center gap-10 mb-16">
          <div className="text-center">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Inquiries</h4>
            <p className="text-lg font-medium">{data.email}</p>
          </div>
          <div className="text-center">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Connect</h4>
            <p className="text-lg font-medium">{data.phone}</p>
          </div>
          <div className="text-center">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Visit</h4>
            <p className="text-lg font-medium">{data.website}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl opacity-60 print:flex print:justify-center print:gap-8">
           {data.socials.linkedin && <span className="text-sm font-bold">LinkedIn</span>}
           {data.socials.facebook && <span className="text-sm font-bold">Facebook</span>}
           {data.socials.instagram && <span className="text-sm font-bold">Instagram</span>}
           {data.socials.twitter && <span className="text-sm font-bold">Twitter/X</span>}
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 w-full flex justify-between items-center text-xs text-slate-400 uppercase tracking-widest print:mt-12">
          <span>{data.businessName} &copy; {new Date().getFullYear()}</span>
          <span>{data.address}</span>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPreview;
