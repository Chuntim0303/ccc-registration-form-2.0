import React, { useState, useEffect } from 'react';

const Form = ({ onBack, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidPromoCode, setIsValidPromoCode] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRequirementModal, setShowRequirementModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: ''
  });
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '60',
    phoneNumber: '',
    position: '',
    industry: '',
    specialcode: '',
    receipt: null
  });

  // Get API endpoint from environment variable or use default
  const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL || 
    'https://i2o1s0eemh.execute-api.ap-southeast-1.amazonaws.com/dev2/register';

  // Capture UTM parameters on component mount
  useEffect(() => {
    console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('Environment variables:', import.meta.env);
  console.log('API Endpoint:', API_ENDPOINT);
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || ''
    };
    setUtmParams(utmData);
    
    // Store in sessionStorage for persistence
    sessionStorage.setItem('utm_params', JSON.stringify(utmData));
  }, []);

  const validPromoCodes = [
    'CON01', 'SN01', 'SU01', 'RE01', 'ZE01', 'CE01', 'ZA01', 'WE01', 
    'FI01', 'FE01', 'AD01', 'FA01', 'KE01', 'SM01', 'SA01', 'SH01', 
    'HA01', 'PH01', 'ME01', 'JO01', 'DA01', 'MI01', 'YC01'
  ];

  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'specialcode') {
      checkPromoCode(value);
    }
    
    // Clear error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('File size must be less than 5MB');
        return;
      }
      
      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setErrorMessage('Please upload a PDF, JPG, or PNG file');
        return;
      }
      
      setFormData(prev => ({ ...prev, receipt: file }));
      setFileName(file.name);
      setErrorMessage('');
    }
  };

  const checkPromoCode = (code) => {
    if (code === '') {
      setPromoMessage('');
      setIsValidPromoCode(false);
      return;
    }

    if (validPromoCodes.includes(code.toUpperCase())) {
      setPromoMessage('Valid code! Registration is free.');
      setIsValidPromoCode(true);
    } else {
      setPromoMessage('Invalid promo code.');
      setIsValidPromoCode(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setErrorMessage('Please enter your full name');
        return false;
      }
      if (!formData.email.trim()) {
        setErrorMessage('Please enter your email');
        return false;
      }
      if (!validateEmail(formData.email)) {
        setErrorMessage('Please enter a valid email address');
        return false;
      }
      if (!formData.phoneNumber.trim()) {
        setErrorMessage('Please enter your phone number');
        return false;
      }
      if (formData.phoneNumber.length < 8) {
        setErrorMessage('Phone number must be at least 8 digits');
        return false;
      }
      return true;
    }
    if (currentStep === 2) {
      if (!formData.position.trim()) {
        setErrorMessage('Please enter your position');
        return false;
      }
      if (!formData.industry) {
        setErrorMessage('Please select your industry');
        return false;
      }
      return true;
    }
    if (currentStep === 4) {
      if (isValidPromoCode) return true;
      if (!formData.receipt) {
        setShowRequirementModal(true);
        return false;
      }
      return true;
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setErrorMessage('');
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrorMessage('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Get UTM params from state or sessionStorage
      const storedUtmParams = sessionStorage.getItem('utm_params');
      const finalUtmParams = storedUtmParams ? JSON.parse(storedUtmParams) : utmParams;

      const submitData = {
        fullName: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.countryCode + formData.phoneNumber.trim(),
        position: formData.position.trim(),
        industry: formData.industry,
        specialcode: formData.specialcode.trim(),
        isPromoCodeUsed: isValidPromoCode,
        promoCode: isValidPromoCode ? formData.specialcode.toUpperCase().trim() : '',
        // Add UTM parameters
        utm_source: finalUtmParams.utm_source,
        utm_medium: finalUtmParams.utm_medium,
        utm_campaign: finalUtmParams.utm_campaign
      };

      // Handle receipt upload if no promo code
      if (!isValidPromoCode && formData.receipt) {
        try {
          const base64Data = await fileToBase64(formData.receipt);
          submitData.receiptBase64 = base64Data.split(',')[1];
          submitData.receiptFilename = formData.receipt.name;
        } catch (error) {
          console.error('File processing error:', error);
          setErrorMessage('Error processing receipt. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }

      // Submit to API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 400) {
          setErrorMessage(responseData.error?.message || 'Invalid submission. Please check your information.');
        } else if (response.status === 409) {
          setErrorMessage('This email has already been registered for this event.');
        } else if (response.status === 500) {
          setErrorMessage('Server error. Please try again later or contact support.');
        } else {
          setErrorMessage('Registration failed. Please try again.');
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Success
      console.log('Registration successful:', responseData);
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        fullName: '', 
        email: '', 
        countryCode: '60', 
        phoneNumber: '',
        position: '', 
        industry: '', 
        specialcode: '', 
        receipt: null
      });
      setCurrentStep(1);
      setIsValidPromoCode(false);
      setPromoMessage('');
      setFileName('');

    } catch (error) {
      console.error('Registration error:', error);
      if (!errorMessage) {
        setErrorMessage('Registration failed. Please try again or contact Amy at 017-661 7262.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    if (onClose) onClose();
    if (onBack) onBack();
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white">
      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <button 
            onClick={onBack || onClose} 
            className="mb-4 text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-2xl font-bold mb-1">Event Registration</h1>
          <p className="text-gray-400 text-sm">Circle Confetti Club Exclusive Event</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
            </div>
            <button 
              onClick={() => setErrorMessage('')}
              className="text-red-400 hover:text-red-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="bg-[#1a1a2e] h-1.5 rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-400" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-10 px-2">
          {[1, 2, 3, 4].map((step, idx) => (
            <React.Fragment key={step}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step < currentStep ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' :
                step === currentStep ? 'bg-gradient-to-br from-purple-500 to-purple-400 text-white scale-110 shadow-lg shadow-purple-500/30' :
                'bg-[#1a1a2e] border-2 border-[#2d2d44] text-gray-500'
              }`}>
                {step < currentStep ? '✓' : step}
              </div>
              {idx < 3 && (
                <div className="flex-1 h-0.5 mx-2 bg-[#2d2d44] relative">
                  {step < currentStep && <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600" />}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="bg-[#16213e] rounded-2xl p-8 border border-[#2d2d44] mb-6">
            <h2 className="text-lg font-semibold text-purple-300 mb-6">Personal Information</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Full Name <span className="text-red-500">*</span>
                  <span className="block text-xs text-gray-500 mt-1">As per IC/Passport</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-[#0f0f23] border-2 border-[#2d2d44] rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email Address <span className="text-red-500">*</span>
                  <span className="block text-xs text-gray-500 mt-1">Your ticket will be sent here</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-[#0f0f23] border-2 border-[#2d2d44] rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Phone Number <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-[120px_1fr] gap-3">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-[#0f0f23] border-2 border-[#2d2d44] rounded-lg text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="60">🇲🇾 +60</option>
                    <option value="65">🇸🇬 +65</option>
                    <option value="86">🇨🇳 +86</option>
                    <option value="852">🇭🇰 +852</option>
                    <option value="886">🇹🇼 +886</option>
                    <option value="66">🇹🇭 +66</option>
                    <option value="84">🇻🇳 +84</option>
                    <option value="62">🇮🇩 +62</option>
                    <option value="63">🇵🇭 +63</option>
                    <option value="91">🇮🇳 +91</option>
                    <option value="61">🇦🇺 +61</option>
                    <option value="64">🇳🇿 +64</option>
                    <option value="81">🇯🇵 +81</option>
                    <option value="82">🇰🇷 +82</option>
                    <option value="44">🇬🇧 +44</option>
                    <option value="1">🇺🇸 +1</option>
                    <option value="33">🇫🇷 +33</option>
                    <option value="49">🇩🇪 +49</option>
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="123456789"
                    className="px-4 py-3 bg-[#0f0f23] border-2 border-[#2d2d44] rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Professional Information */}
        {currentStep === 2 && (
          <div className="bg-[#16213e] rounded-2xl p-8 border border-[#2d2d44] mb-6">
            <h2 className="text-lg font-semibold text-purple-300 mb-6">Professional Information</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Position <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Your job title"
                  className="w-full px-4 py-3 bg-[#0f0f23] border-2 border-[#2d2d44] rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Industry <span className="text-red-500">*</span></label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#0f0f23] border-2 border-[#2d2d44] rounded-lg text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                  required
                >
                  <option value="">Choose your industry</option>
                  <option value="Agriculture, Forestry & Plantation">Agriculture, Forestry & Plantation</option>
                  <option value="Automotive (Sales, Services, Parts)">Automotive (Sales, Services, Parts)</option>
                  <option value="Banking & Finance">Banking & Finance</option>
                  <option value="Construction & Building">Construction & Building</option>
                  <option value="Creative & Design (Photography, Art, etc.)">Creative & Design (Photography, Art, etc.)</option>
                  <option value="Education (School, Tuition, Training)">Education (School, Tuition, Training)</option>
                  <option value="Engineering & Technical Services">Engineering & Technical Services</option>
                  <option value="Food & Beverage (F&B)">Food & Beverage (F&B)</option>
                  <option value="Healthcare (Clinic, Hospital, Wellness)">Healthcare (Clinic, Hospital, Wellness)</option>
                  <option value="Hospitality (Hotels, Events, etc.)">Hospitality (Hotels, Events, etc.)</option>
                  <option value="Information Technology (IT & Software)">Information Technology (IT & Software)</option>
                  <option value="Insurance & Takaful">Insurance & Takaful</option>
                  <option value="Legal, Accounting & Consulting Services">Legal, Accounting & Consulting Services</option>
                  <option value="Manufacturing (General)">Manufacturing (General)</option>
                  <option value="Media, Marketing & Advertising">Media, Marketing & Advertising</option>
                  <option value="Property & Real Estate">Property & Real Estate</option>
                  <option value="Retail (Shops, E-commerce, etc.)">Retail (Shops, E-commerce, etc.)</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Transportation & Logistics">Transportation & Logistics</option>
                  <option value="Travel, Tourism & Leisure">Travel, Tourism & Leisure</option>
                  <option value="Student">Student</option>
                  <option value="Government / Public Sector">Government / Public Sector</option>
                  <option value="NGO / Non-Profit / Religious Organization">NGO / Non-Profit / Religious Organization</option>
                  <option value="Homemaker / Retired">Homemaker / Retired</option>
                  <option value="Unemployed / Jobseeker">Unemployed / Jobseeker</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Event Information */}
        {currentStep === 3 && (
          <div className="bg-[#16213e] rounded-2xl p-8 border border-[#2d2d44] mb-6">
            <h2 className="text-lg font-semibold text-purple-300 mb-6">Event Information</h2>
            
            <div className="space-y-5">
              

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Special Code
                  <span className="block text-xs text-gray-500 mt-1">Enter if you have one</span>
                </label>
                <input
                  type="text"
                  name="specialcode"
                  value={formData.specialcode}
                  onChange={handleInputChange}
                  placeholder="Enter promo code"
                  className="w-full px-4 py-3 bg-[#0f0f23] border-2 border-[#2d2d44] rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
                {promoMessage && (
                  <div className={`mt-2 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    isValidPromoCode ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {isValidPromoCode ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    {promoMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Payment/Summary */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-semibold text-purple-300 mb-6 text-center">Complete Registration</h2>
            
            {isValidPromoCode ? (
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-center mb-6 text-white font-medium flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>🎉 Your promo code is valid - Registration is FREE!</span>
              </div>
            ) : (
              <div className="bg-[#1a1a2e] p-6 rounded-xl border border-[#2d2d44] mb-6">
                <h3 className="text-base font-medium text-white mb-3 text-center">Payment Instructions</h3>
                <p className="text-gray-400 text-sm mb-4 text-center">Transfer RM159 to the account below</p>
                
                <div className="max-w-[240px] mx-auto mb-4">
                  <div className="bg-gray-700 rounded-lg aspect-square flex items-center justify-center text-gray-400 text-sm p-4">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      QR Code Placeholder
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Upload Payment Receipt <span className="text-red-500">*</span>
                    <span className="block text-xs text-gray-500 mt-1">Upload your transfer receipt (PDF/JPG/PNG, max 5MB)</span>
                  </label>
                  <div className={`relative border-2 border-dashed rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer bg-[#0f0f23] ${
                    fileName ? 'border-green-500 border-solid' : 'border-[#2d2d44]'
                  }`}>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className={`text-center text-sm flex items-center justify-center gap-2 ${
                      fileName ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                      </svg>
                      <span>{fileName || 'Choose file or drag here'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center text-gray-400 text-sm">
              Need help? Contact Amy at <strong className="text-white">017-661 7262</strong>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-[#2d2d44]">
          {currentStep > 1 && (
            <button 
              onClick={prevStep} 
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#1a1a2e] border-2 border-[#2d2d44] rounded-lg text-gray-400 hover:text-white hover:bg-[#2d2d44] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Previous
            </button>
          )}
          <button
            onClick={nextStep}
            disabled={isSubmitting}
            className={`ml-auto px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
              currentStep === totalSteps
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/50'
                : 'bg-gradient-to-r from-purple-500 to-purple-400 text-white hover:shadow-lg hover:shadow-purple-500/50'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : currentStep === totalSteps ? (
              <>
                <span>Submit</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-5 z-50" 
          onClick={handleSuccessClose}
        >
          <div 
            className="bg-[#16213e] p-8 rounded-2xl max-w-md w-full border border-[#2d2d44] animate-[modalSlideIn_0.3s_ease]" 
            onClick={e => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Registration Successful!</h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              Thank you for registering! Check your email for your QR code ticket. 
              Contact Amy at 017-661 7262 if you need assistance.
            </p>
            <button 
              onClick={handleSuccessClose} 
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Requirement Modal */}
      {showRequirementModal && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-5 z-50" 
          onClick={() => setShowRequirementModal(false)}
        >
          <div 
            className="bg-[#16213e] p-8 rounded-2xl max-w-md w-full border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-[modalSlideIn_0.3s_ease]" 
            onClick={e => e.stopPropagation()}
          >
            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Payment Required</h3>
            <p className="text-gray-400 text-sm text-center mb-4">Please complete one of the following:</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Upload Payment Receipt</div>
                  <div className="text-gray-400 text-xs mt-1">Transfer RM159 and upload your receipt</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Enter Valid Promo Code</div>
                  <div className="text-gray-400 text-xs mt-1">Use a promo code for free registration</div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowRequirementModal(false)} 
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-400 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

  
export default Form;