import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const ConfettiLandingPage = ({ onShowForm }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 16,
    hours: 5,
    minutes: 4,
    seconds: 45
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const targetDate = new Date('2025-10-29T00:00:00+08:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Image carousel data
  const carouselImages1 = [
    "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68c04919e7a3ab4980142e4c.jpeg",
    "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68bfce1f839785d8d1420c04.jpeg",
    "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68bfcef2fbf3b67a199b9367.jpeg",
    "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68bfcf07394e52f499b66e9f.jpeg",
    "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68bfcefddb3e006d4b642ac0.jpeg"
  ];

  const carouselImages2 = [
    "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68bfcef2fbf3b67a199b9367.jpeg",
    "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68bbd0561ff6ea0fe51444bb.jpeg",
    "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68c049057cf8d6d5b68d4986.jpeg",
    "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68c0490a839785d3037168fc.jpeg",
    "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68c0491432f3397573de6d09.jpeg"
  ];

  // YouTube video URLs
  const youtubeVideos = [
    "https://www.youtube.com/embed/9EqxMH-HbXY",
    "https://www.youtube.com/embed/imoH3aai_4s"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages1.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages1.length - 1 : prev - 1));
  };

  const nextSlide2 = () => {
    setCurrentSlide2((prev) => (prev === carouselImages2.length - 1 ? 0 : prev + 1));
  };

  const prevSlide2 = () => {
    setCurrentSlide2((prev) => (prev === 0 ? carouselImages2.length - 1 : prev - 1));
  };

  const testimonials = [
    {
      name: "Carrie Lee",
      title: "Founder of Miss CosmoWorld",
      text: "You can come and choose and select the best place to do your events a celebration is always fun and it's worthable to join them。",
      image: "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68c65d4151406edb93bd222b.jpeg"
    },
    {
      name: "Jacky",
      title: "Co-Founder of Only Once Performance",
      text: "所有的人只要有机会非常推荐你来，来到这里会发现新的世界，你会发现全马创业家都会在这里认识。",
      image: "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68c65aeee5b5d8023fa7483d.jpeg"
    },
    {
      name: "Eliz Teh",
      title: "Entrepreneur",
      text: "可以认识很多人以外，还可以了解不同的领域，刻意扩大自己的眼界和知识。",
      image: "https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68c6596e3bfa06e7deb4d92d.jpeg"
    }
  ];

  const faqs = [
    {
      q: "1. 谁可以参加此活动？",
      a: "Confetti Circle Club 特别为那些渴望成长、拓展人脉、展示个人价值、寻找合作机会的宾客而设。不论你来自哪个行业，只要你认真生活、期待共创，都欢迎加入。"
    },
    {
      q: "2. 着装建议是什么？",
      a: "建议穿着 Smart Casual 或商务服装，展现你的专业感与品味，也更容易与他人建立好印象。"
    },
    {
      q: "3. 可以在现场交流与分享吗？",
      a: "当然可以！我们特别设计了多个轻松自在的交流空间，欢迎你畅所欲言，认识来自各领域的伙伴。"
    },
    {
      q: "4. 临时无法出席怎么办？",
      a: "名额有限，若您无法出席，请至少提前两天通知我们。您的报名资格将保留，可转为下个月的 Confetti Circle Club 参与机会。"
    },
    {
      q: "5. 如何报名参加？",
      a: "点击「RSVP」按钮，填写简单表单后，我们的团队将尽快联系您，确认出席与时段。"
    },
    {
      q: "6. 活动在哪里举办？",
      a: "活动地点为 Confetti KL。可通过 Waze 或 Google Maps 搜索 Confetti KL 导航。"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:50px_50px] opacity-20"></div>
        
        {/* Horizon Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-pink-500/30 via-purple-500/20 to-transparent"></div>
        
        {/* Grid Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-64 perspective-1000">
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(236,72,153,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(236,72,153,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: 'rotateX(60deg) translateY(40px)',
              transformOrigin: 'bottom'
            }}
          ></div>
        </div>
      </div>

      {/* Poster Section */}
      <section className="relative h-screen px-4 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center justify-center p-4">
          <img 
            src="https://storage.googleapis.com/msgsndr/fwa898U4hQFevOOZ1miD/media/68c7b7151708d0dd2494d18f.png" 
            alt="Confetti Circle Club Poster" 
            className="w-full h-auto max-h-[90vh] object-contain drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]"
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative px-4 py-8 md:py-12 z-10">
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Countdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto mb-8 md:mb-12">
            {[
              { value: timeLeft.days, label: 'days' },
              { value: timeLeft.hours, label: 'hours' },
              { value: timeLeft.minutes, label: 'minutes' },
              { value: timeLeft.seconds, label: 'seconds' }
            ].map((item, index) => (
              <div key={index} className="bg-black/60 backdrop-blur-md rounded-lg p-3 md:p-4 border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                <div className="text-2xl md:text-4xl font-bold text-pink-400">{item.value}</div>
                <div className="text-xs md:text-sm text-purple-300">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Event Card */}
          <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-pink-500/30 max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Confetti Circle Club 3.0
            </h1>
            <p className="text-lg md:text-xl mb-2">500+ 企业家 · 创新者 · 行业领袖齐聚</p>
            <p className="text-base md:text-lg mb-4 md:mb-6 text-purple-300">连接 · 启发 · 转化</p>
            
            <div className="space-y-2 text-left max-w-md mx-auto mb-6 md:mb-8">
              <p className="flex items-center gap-2 text-sm md:text-base">
                <Calendar size={18} className="text-pink-400 flex-shrink-0" />
                日期: 2025年10月29日 (星期三)
              </p>
              <p className="flex items-center gap-2 text-sm md:text-base">
                <Clock size={18} className="text-pink-400 flex-shrink-0" />
                时间: 5:30pm - 10:00pm
              </p>
              <p className="flex items-center gap-2 text-sm md:text-base">
                <MapPin size={18} className="text-pink-400 flex-shrink-0" />
                地点: Confetti KL Ballroom
              </p>
              <p className="flex items-center gap-2 text-sm md:text-base">
                <Users size={18} className="text-pink-400 flex-shrink-0" />
                门票: RM159 (included 6% sst)
              </p>
            </div>
            
            <button 
              onClick={onShowForm}
              className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(236,72,153,0.5)] border border-pink-400/50 text-sm md:text-base"
            >
              REGISTER NOW
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            什么是《Confetti Circle Club》
          </h2>
          <p className="text-base md:text-xl text-center mb-8 md:mb-16 max-w-3xl mx-auto leading-relaxed text-gray-300 px-4">
            Confetti Circle Club 是由 Confetti 打造的高端商业连接生态。
            这里的交流不止于名片交换，而是转化为 合作、伙伴关系与长期价值。
            500+ 企业家、投资人、行业领袖汇聚于此，在对话、合作与体验中，开创属于未来的机会。
          </p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8 px-4">
            {[
              { title: "延续性", desc: "不是一次性聚会，而是一个可长期扩展商业合作的生态圈。" },
              { title: "结构化设计", desc: "狂欢区 / 交流区 / 游戏区 / 战略签署，互动自然发生。" },
              { title: "真实转化", desc: "往届 92% 参会者表示收获了可跟进的商业机会。" }
            ].map((item, idx) => (
              <div key={idx} className="bg-black/60 backdrop-blur-md rounded-xl p-4 md:p-6 border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-pink-400">{item.title}</h3>
                <p className="text-gray-300 text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Benefits Section */}
      <section className="py-12 md:py-20 px-4 relative z-10 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">你将收获什么？</h2>
          
          {/* REVISED: Use flexbox for centering and wrapping */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4">
            {[
              "⚡ 结识 500+ 企业家 & 行业领袖",
              "⚡ 进入真实高效的资源对接环境",
              "⚡ 参与思想圆桌与趋势分享",
              "⚡ 见证合作战略签署",
              "⚡ 长期进入商业合作生态圈"
            ].map((benefit, idx) => (
              <div 
                key={idx} 
                // Set max width for the box so it doesn't span the full container
                // On small screens, it takes full width (w-full), then max-w-sm on larger screens.
                // This ensures it wraps nicely and is centered.
                className="w-full sm:max-w-sm md:max-w-md lg:max-w-xs bg-black/60 backdrop-blur-md rounded-xl p-4 md:p-6 text-center border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]"
              >
                <h3 className="text-base md:text-xl font-semibold text-gray-200">{benefit}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Media Section */}
      <section className="py-12 md:py-20 px-4 relative z-10 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            活动精彩瞬间与回顾
          </h2>
          
          <div className="space-y-12 md:space-y-16">
            {/* First Image Carousel */}
            <div className="relative max-w-5xl mx-auto">
              <div className="overflow-hidden rounded-xl md:rounded-2xl shadow-2xl border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.3)]">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {carouselImages1.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <img 
                        src={image} 
                        alt={`Event moment ${index + 1}`}
                        className="w-full h-64 md:h-80 lg:h-96 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-pink-500/20 backdrop-blur-md rounded-full p-2 md:p-3 hover:bg-pink-500/40 transition-colors border border-pink-500/50"
              >
                <ChevronLeft size={20} className="md:w-7 md:h-7" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-pink-500/20 backdrop-blur-md rounded-full p-2 md:p-3 hover:bg-pink-500/40 transition-colors border border-pink-500/50"
              >
                <ChevronRight size={20} className="md:w-7 md:h-7" />
              </button>
              
              <div className="flex justify-center mt-4 md:mt-6 space-x-2">
                {carouselImages1.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.8)]' : 'bg-pink-400/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* First YouTube Video */}
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.3)]" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={youtubeVideos[0]}
                  title="Event video 1"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Second Image Carousel */}
            <div className="relative max-w-5xl mx-auto">
              <div className="overflow-hidden rounded-xl md:rounded-2xl shadow-2xl border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.3)]">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide2 * 100}%)` }}
                >
                  {carouselImages2.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <img 
                        src={image} 
                        alt={`Event moment ${index + 4}`}
                        className="w-full h-64 md:h-80 lg:h-96 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={prevSlide2}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-pink-500/20 backdrop-blur-md rounded-full p-2 md:p-3 hover:bg-pink-500/40 transition-colors border border-pink-500/50"
              >
                <ChevronLeft size={20} className="md:w-7 md:h-7" />
              </button>
              <button 
                onClick={nextSlide2}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-pink-500/20 backdrop-blur-md rounded-full p-2 md:p-3 hover:bg-pink-500/40 transition-colors border border-pink-500/50"
              >
                <ChevronRight size={20} className="md:w-7 md:h-7" />
              </button>
              
              <div className="flex justify-center mt-4 md:mt-6 space-x-2">
                {carouselImages2.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide2(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                      currentSlide2 === index ? 'bg-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.8)]' : 'bg-pink-400/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Second YouTube Video */}
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.3)]" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={youtubeVideos[1]}
                  title="Event video 2"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Testimonials */}
      <section className="py-12 md:py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            CoNfetti Circle Club 听听他们怎样说:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-md text-white rounded-xl p-4 md:p-6 shadow-xl border border-pink-500/30">
                <div className="flex gap-1 mb-3 md:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-pink-400 text-sm md:text-base">★</span>
                  ))}
                </div>
                <p className="italic mb-3 md:mb-4 text-xs md:text-sm text-gray-300 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-pink-400/50"
                  />
                  <div>
                    <div className="font-bold text-pink-300 text-sm md:text-base">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-gray-400">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 px-4 relative z-10 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">FAQ</h2>
          
          <div className="space-y-3 md:space-y-4 px-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-black/60 backdrop-blur-md rounded-xl overflow-hidden border border-pink-500/30">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 md:p-6 font-semibold flex justify-between items-center hover:bg-pink-500/10 transition-colors text-sm md:text-base"
                >
                  <span className="text-gray-200 text-left pr-4">{faq.q}</span>
                  <span className="text-xl md:text-2xl text-pink-400 flex-shrink-0">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="p-4 md:p-6 pt-0 text-gray-300 text-sm md:text-base leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Final CTA */}
<section className="py-12 md:py-20 px-4 relative z-10">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
      {/* Left side - Content */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Confetti Circle Club 3.0
        </h2>
        <p className="text-lg md:text-xl mb-2">500+ 企业家 · 创新者 · 行业领袖齐聚</p>
        <p className="text-base md:text-lg mb-4 md:mb-6 text-purple-300">连接 · 启发 · 转化</p>
        
        <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 md:p-8 mb-6 md:mb-8 border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.2)] text-sm md:text-base">
          <p className="mb-2 text-gray-300"><strong className="text-pink-400">日期:</strong> 10月29日 (Wednesday)</p>
          <p className="mb-2 text-gray-300"><strong className="text-pink-400">时间:</strong> 5:30 PM – 10:00 PM</p>
          <p className="mb-2 text-gray-300"><strong className="text-pink-400">🎫 门票 RM159</strong> (RM150 + 6%sst /pax)</p>
          <p className="mb-2 text-gray-300"><strong className="text-pink-400">📍Confetti KL</strong> (Mines 2, Seri Kembangan)</p>
          <p className="text-xs md:text-sm text-gray-400">Ground floor Retail Block, Pusat Perdagangan Mines 2,</p>
          <p className="text-xs md:text-sm mb-3 md:mb-4 text-gray-400">Mines Wellness City, 43300 Seri Kembangan, Selangor.</p>
          <p className="text-xs md:text-sm text-gray-300">
            <strong className="text-pink-400">Whatsapp:</strong>{' '}
            <a href="https://wa.link/540nlz" className="underline hover:text-pink-300 text-purple-300 break-all">
              017-6617262 (Amy - Member Support)
            </a>
          </p>
        </div>
        
        <button 
          onClick={onShowForm}
          className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(236,72,153,0.6)] border border-pink-400/50 text-sm md:text-base"
        >
          REGISTER NOW
        </button>
      </div>

      {/* Right side - Google Map */}
      <div className="lg:w-1/2 w-full">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.237868669636!2d101.7081257!3d3.0271893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdcb5ee33ac55f%3A0x5d377ad570dbc5fd!2sConfetti%20KL!5e0!3m2!1sen!2smy!4v1698765432100!5m2!1sen!2smy"
      width="100%"
      height="400"
      style={{ border: 0, borderRadius: '12px' }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Confetti KL Location"
      className="w-full"
    ></iframe>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center lg:text-left">
          📍 Confetti KL - Ground floor Retail Block, Pusat Perdagangan Mines 2
        </p>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default ConfettiLandingPage;