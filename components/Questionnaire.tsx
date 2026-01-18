
import React, { useState } from 'react';
import { UserInput, BusinessNiche, BusinessStage, VisualStyle } from '../types';
import { NICHES, CI_SETS } from '../constants';

interface Props {
  onSubmit: (data: UserInput) => void;
}

const Questionnaire: React.FC<Props> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserInput>>({
    services: ['', '', ''],
    ciSetId: 'auto',
    socials: {}
  });

  const updateField = (field: keyof UserInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSocial = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socials: { ...prev.socials, [field]: value }
    }));
  };

  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...(formData.services || [])];
    newServices[index] = value;
    updateField('services', newServices);
  };

  const addService = () => {
    updateField('services', [...(formData.services || []), '']);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Business Basics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Name</label>
                <input 
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. NexaCore Solutions"
                  value={formData.businessName || ''}
                  onChange={e => updateField('businessName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Business Niche</label>
                <select 
                  className="w-full p-2 border rounded-lg"
                  value={formData.niche || ''}
                  onChange={e => updateField('niche', e.target.value as BusinessNiche)}
                >
                  <option value="">Select Niche...</option>
                  {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Business Stage</label>
                <select 
                  className="w-full p-2 border rounded-lg"
                  value={formData.stage || ''}
                  onChange={e => updateField('stage', e.target.value as BusinessStage)}
                >
                  <option value="Startup">Startup</option>
                  <option value="Growing">Growing</option>
                  <option value="Established">Established</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location / Market</label>
                <input 
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g. Johannesburg, South Africa"
                  value={formData.location || ''}
                  onChange={e => updateField('location', e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={nextStep}
                disabled={!formData.businessName || !formData.niche}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Next Step
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Contact & Brand Style</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Primary Email</label>
                <input className="w-full p-2 border rounded-lg" placeholder="hello@company.com" value={formData.email || ''} onChange={e => updateField('email', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input className="w-full p-2 border rounded-lg" placeholder="+27 82..." value={formData.phone || ''} onChange={e => updateField('phone', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Visual Style Choice</label>
                <select className="w-full p-2 border rounded-lg" value={formData.visualStyle || ''} onChange={e => updateField('visualStyle', e.target.value as VisualStyle)}>
                  <option value="">Select Style...</option>
                  <option value="Professional / Corporate">Professional / Corporate</option>
                  <option value="Modern / Tech / SaaS">Modern / Tech / SaaS</option>
                  <option value="Luxury / Premium">Luxury / Premium</option>
                  <option value="Creative / Bold / Digital">Creative / Bold / Digital</option>
                  <option value="Minimal / Swiss">Minimal / Swiss</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CI Set (Optional)</label>
                <select className="w-full p-2 border rounded-lg" value={formData.ciSetId || 'auto'} onChange={e => updateField('ciSetId', e.target.value === 'auto' ? 'auto' : parseInt(e.target.value))}>
                  <option value="auto">AI Suggested</option>
                  {CI_SETS.map(c => <option key={c.id} value={c.id}>CI Set #{c.id}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-slate-200 text-slate-800 px-6 py-2 rounded-lg hover:bg-slate-300">Back</button>
              <button onClick={nextStep} disabled={!formData.visualStyle} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">Next Step</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Services & Vision</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Core Services (3-8)</label>
              <div className="space-y-2">
                {formData.services?.map((s, i) => (
                  <input key={i} className="w-full p-2 border rounded-lg" placeholder={`Service ${i+1}`} value={s} onChange={e => handleServiceChange(i, e.target.value)} />
                ))}
                <button onClick={addService} className="text-blue-600 text-sm font-medium">+ Add Service</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vision Statement (Short)</label>
                <textarea className="w-full p-2 border rounded-lg h-24" placeholder="Where do you see the business in 5 years?" value={formData.vision || ''} onChange={e => updateField('vision', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mission Statement (Short)</label>
                <textarea className="w-full p-2 border rounded-lg h-24" placeholder="How do you help your clients today?" value={formData.mission || ''} onChange={e => updateField('mission', e.target.value)} />
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-slate-200 text-slate-800 px-6 py-2 rounded-lg hover:bg-slate-300">Back</button>
              <button onClick={nextStep} disabled={!formData.vision || !formData.mission} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Next Step</button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Strategy & Differentiation</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Who is your target client?</label>
                <input className="w-full p-2 border rounded-lg" placeholder="e.g. Fortune 500 tech companies" value={formData.targetAudience || ''} onChange={e => updateField('targetAudience', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">What primary problem do you solve?</label>
                <textarea className="w-full p-2 border rounded-lg h-20" placeholder="e.g. High operational overhead due to manual data processing" value={formData.problemSolved || ''} onChange={e => updateField('problemSolved', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">What makes you unique? (Value Proposition)</label>
                <textarea className="w-full p-2 border rounded-lg h-20" placeholder="e.g. Proprietary AI models that learn 10x faster" value={formData.uniqueValue || ''} onChange={e => updateField('uniqueValue', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Why should clients choose you?</label>
                <textarea className="w-full p-2 border rounded-lg h-20" placeholder="e.g. Proven track record, 24/7 support, affordable pricing" value={formData.whyChooseUs || ''} onChange={e => updateField('whyChooseUs', e.target.value)} />
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={prevStep} className="bg-slate-200 text-slate-800 px-6 py-2 rounded-lg hover:bg-slate-300">Back</button>
              <button 
                onClick={() => onSubmit(formData as UserInput)} 
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-bold shadow-lg shadow-green-100"
              >
                Generate Professional Portfolio
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <div className="mb-8 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${step >= 1 ? 'border-blue-600' : ''}`}>1</span>
          Basics
        </div>
        <div className="flex-1 h-px bg-slate-100 mx-4"></div>
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${step >= 2 ? 'border-blue-600' : ''}`}>2</span>
          Identity
        </div>
        <div className="flex-1 h-px bg-slate-100 mx-4"></div>
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${step >= 3 ? 'border-blue-600' : ''}`}>3</span>
          Services
        </div>
        <div className="flex-1 h-px bg-slate-100 mx-4"></div>
        <div className={`flex items-center gap-2 ${step >= 4 ? 'text-blue-600' : ''}`}>
          <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${step >= 4 ? 'border-blue-600' : ''}`}>4</span>
          Strategy
        </div>
      </div>
      {renderStep()}
    </div>
  );
};

export default Questionnaire;
