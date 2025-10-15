import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import industries from './components/industryOptions';
import countryCodes from './components/countryCodes';

const Form = ({ onClose }) => {
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

  const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL ||
    'https://2ko8yhgag2.execute-api.ap-southeast-1.amazonaws.com/dev/register';
  const PROMO_CODE_CHECK_ENDPOINT = import.meta.env.VITE_PROMO_CODE_CHECK_URL ||
    'https://2ko8yhgag2.execute-api.ap-southeast-1.amazonaws.com/dev/check-promo-code';

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || ''
    };
    setUtmParams(utmData);
    sessionStorage.setItem('utm_params', JSON.stringify(utmData));
  }, []);

  const totalSteps = 3;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'specialcode') {
      checkPromoCode(value);
    }
    setErrorMessage('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('File size must be less than 5MB');
        return;
      }
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

  const checkPromoCode = async (code) => {
    if (code.trim() === '') {
      setPromoMessage('');
      setIsValidPromoCode(false);
      return;
    }
    await checkPromoCodeOnBackend(code);
  };

  const checkPromoCodeOnBackend = async (code) => {
    setPromoMessage('Checking promo code...');
    setIsValidPromoCode(false);
    try {
      const storedUtmParams = sessionStorage.getItem('utm_params');
      const finalUtmParams = storedUtmParams ? JSON.parse(storedUtmParams) : utmParams;
      const response = await fetch(PROMO_CODE_CHECK_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promoCode: code.toUpperCase().trim(),
          utm_campaign: finalUtmParams.utm_campaign || 'CIRCLE_CONFETTI_2025'
        }),
      });
      const responseData = await response.json();
      if (response.ok && responseData.isValid) {
        setPromoMessage('Valid code! Registration is free.');
        setIsValidPromoCode(true);
      } else {
        setPromoMessage(responseData.message || 'Invalid promo code.');
        setIsValidPromoCode(false);
      }
    } catch (error) {
      console.error('Error checking promo code:', error);
      setPromoMessage('Error verifying promo code. Please try again.');
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
    if (currentStep === 3) {
      if (formData.specialcode.trim() && !isValidPromoCode) {
        setErrorMessage('Please enter a valid promo code or clear the field.');
        return false;
      }
      if (!isValidPromoCode && !formData.receipt) {
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
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrorMessage('');
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
      const storedUtmParams = sessionStorage.getItem('utm_params');
      const finalUtmParams = storedUtmParams ? JSON.parse(storedUtmParams) : utmParams;
      const submitData = {
        fullName: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.countryCode + formData.phoneNumber.trim(),
        position: formData.position.trim(),
        industry: formData.industry,
        promoCode: formData.specialcode.toUpperCase().trim(),
        isPromoCodeUsed: isValidPromoCode,
        utm_source: finalUtmParams.utm_source,
        utm_medium: finalUtmParams.utm_medium,
        utm_campaign: finalUtmParams.utm_campaign
      };
      if (!isValidPromoCode && formData.receipt) {
        const base64Data = await fileToBase64(formData.receipt);
        submitData.receiptBase64 = base64Data.split(',')[1];
        submitData.receiptFilename = formData.receipt.name;
      }
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });
      const responseData = await response.json();
      if (!response.ok) {
        if (response.status === 400) {
          if (responseData.error === 'Invalid JSON') {
            setErrorMessage('Invalid submission. Please check your information.');
          } else if (responseData.error === 'Validation failed') {
            setErrorMessage(`Validation error: ${responseData.details.join(', ')}`);
          } else if (responseData.error === 'PaymentRequired') {
            setErrorMessage('Payment receipt is required for non-promo code registrations.');
            setShowRequirementModal(true);
          } else {
            setErrorMessage(responseData.message || 'Invalid submission. Please check your information.');
          }
        } else if (response.status === 409) {
          setErrorMessage('This email has already been registered for this event.');
        } else if (response.status === 500) {
          setErrorMessage('Server error. Please try again later or contact support.');
        } else {
          setErrorMessage('Registration failed. Please try again.');
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setShowSuccessModal(true);
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
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="relative bg-black/90 backdrop-blur-lg text-white rounded-3xl shadow-2xl border border-pink-500/30 max-w-2xl mx-auto my-12 p-10">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-purple-200 hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full p-1"
        aria-label="Close form"
      >
        <X size={28} />
      </button>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Event Registration</h1>
        <p className="text-lg text-purple-200 mt-3">Join Confetti Circle Club 3.0</p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-pink-900/30 border border-pink-500/50 rounded-xl p-5 mb-8 flex items-center gap-4 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
          <svg className="w-6 h-6 text-pink-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-pink-200 text-base flex-1">{errorMessage}</p>
          <button
            onClick={() => setErrorMessage('')}
            className="text-pink-300 hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full p-1"
            aria-label="Dismiss error"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="bg-black/60 h-3 rounded-full overflow-hidden mb-10 border border-purple-500/30">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center gap-12 mb-10">
        {['Personal', 'Professional', 'Payment'].map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
              index + 1 < currentStep ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]' :
              index + 1 === currentStep ? 'bg-gradient-to-br from-pink-400 to-purple-400 text-white scale-110 shadow-[0_0_25px_rgba(236,72,153,0.6)]' :
              'bg-black/60 border-2 border-purple-500/30 text-purple-200'
            }`}>
              {index + 1 < currentStep ? '✓' : index + 1}
            </div>
            <p className="text-sm mt-3 text-purple-200 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <div className="space-y-6">
        {currentStep === 1 && (
          <>
            <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Personal Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium text-purple-100 mb-2" htmlFor="fullName">
                  Full Name <span className="text-pink-400">*</span>
                  <span className="block text-sm text-purple-200/70 mt-1">As per IC/Passport</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-5 py-3 bg-black/50 border border-purple-500/40 rounded-xl text-white text-base focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all placeholder-purple-200/50"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-purple-100 mb-2" htmlFor="email">
                  Email Address <span className="text-pink-400">*</span>
                  <span className="block text-sm text-purple-200/70 mt-1">Your ticket will be sent here</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-5 py-3 bg-black/50 border border-purple-500/40 rounded-xl text-white text-base focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all placeholder-purple-200/50"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-purple-100 mb-2" htmlFor="phoneNumber">
                  Phone Number <span className="text-pink-400">*</span>
                </label>
                <div className="flex gap-3">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-32 px-5 py-3 bg-black/50 border border-purple-500/40 rounded-xl text-white text-base focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all cursor-pointer"
                    aria-label="Country code"
                  >
                    {countryCodes.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.flag} +{country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="123456789"
                    className="flex-1 px-5 py-3 bg-black/50 border border-purple-500/40 rounded-xl text-white text-base focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all placeholder-purple-200/50"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Professional Information</h2>
            <div className="space-y-8">
              <div>
                <label className="block text-base font-medium text-purple-100 mb-3" htmlFor="position">
                  Position <span className="text-pink-400">*</span>
                </label>
                <input
                  id="position"
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Your job title"
                  className="w-full px-5 py-4 bg-black/50 border border-purple-500/40 rounded-xl text-white text-base focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all placeholder-purple-200/50"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-purple-100 mb-3" htmlFor="industry">
                  Industry <span className="text-pink-400">*</span>
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-black/50 border border-purple-500/40 rounded-xl text-white text-base focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all cursor-pointer"
                  required
                  aria-required="true"
                >
                  <option value="">Select your industry</option>
                  {industries.map((industry, index) => (
                    <option key={index} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Complete Registration</h2>

            {/* Promo Code Section */}
            <div className="bg-black/60 rounded-2xl p-6 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">Promo Code (Optional)</h3>
              <input
                type="text"
                name="specialcode"
                value={formData.specialcode}
                onChange={handleInputChange}
                placeholder="Enter promo code"
                className="w-full px-5 py-3 bg-black/70 border border-purple-500/40 rounded-xl text-white text-base focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all placeholder-purple-200/50"
              />
              {promoMessage && (
                <div className={`mt-4 p-4 rounded-xl text-base flex items-center gap-3 ${
                  isValidPromoCode ? 'bg-green-900/30 text-green-200 border border-green-500/40' : 'bg-pink-900/30 text-pink-200 border border-pink-500/40'
                }`}>
                  {isValidPromoCode ? (
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-pink-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  {promoMessage}
                </div>
              )}
              {isValidPromoCode && (
                <div className="mt-4 p-4 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-xl text-center text-purple-100 text-base font-medium">
                  🎉 Registration is FREE with this code!
                </div>
              )}
            </div>

            {/* Payment Section */}
            {!isValidPromoCode && (
              <div className="bg-black/60 rounded-2xl p-6 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 text-center">Payment Information</h3>
                <p className="text-purple-200 text-base mb-6 text-center">Scan to pay RM159 (incl. 6% SST) and upload your receipt.</p>
                <div className="flex justify-center mb-6">
                  <div className="bg-white/90 p-4 rounded-xl border border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                    <img
                      src="/qr_code.jpg"
                      alt="Payment QR Code"
                      className="w-80 h-80 object-contain"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-purple-100 mb-2">
                    Upload Receipt <span className="text-pink-400">*</span>
                    <span className="block text-sm text-purple-200/70 mt-1">PDF, JPG, or PNG (max 5MB)</span>
                  </label>
                  <div className={`relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer ${
                    fileName ? 'border-pink-500 border-solid bg-pink-500/20' : 'border-purple-500/40 hover:border-pink-500'
                  }`}>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      aria-label="Upload receipt"
                    />
                    <div className="text-center text-base text-purple-200">
                      {fileName ? `✓ ${fileName}` : 'Drag & drop or click to upload'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="sticky bottom-0 bg-black/90 pt-6 mt-8 border-t border-purple-500/30">
        <div className="flex justify-between">
          {currentStep > 1 && (
            <button 
              onClick={prevStep} 
              disabled={isSubmitting}
              className="px-8 py-3 bg-black/60 border border-purple-500/40 rounded-xl text-purple-200 text-base font-medium hover:bg-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Previous
            </button>
          )}
          <button
            onClick={nextStep}
            disabled={isSubmitting}
            className={`ml-auto px-8 py-3 rounded-xl text-base font-bold text-white transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] ${
              isSubmitting ? 'bg-purple-500/50 cursor-not-allowed' :
              'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="inline-block w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : currentStep === totalSteps ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md" onClick={handleSuccessClose}>
          <div className="bg-black/90 p-10 rounded-3xl max-w-md w-full border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.3)]" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_rgba(236,72,153,0.5)]">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">Registration Successful!</h3>
              <p className="text-base text-purple-200 mb-8">Check your email for your QR code ticket. Contact Amy at <a href="tel:+60176617262" className="text-pink-400 hover:underline">017-661 7262</a> for assistance.</p>
              <button 
                onClick={handleSuccessClose} 
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white text-base font-bold hover:from-pink-600 hover:to-purple-600 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Requirement Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md" onClick={() => setShowRequirementModal(false)}>
          <div className="bg-black/90 p-10 rounded-3xl max-w-md w-full border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.3)]" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">Action Required</h3>
              <p className="text-base text-purple-200 mb-8">Please upload a payment receipt or enter a valid promo code to complete your registration.</p>
              <button 
                onClick={() => setShowRequirementModal(false)} 
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white text-base font-bold hover:from-pink-600 hover:to-purple-600 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;