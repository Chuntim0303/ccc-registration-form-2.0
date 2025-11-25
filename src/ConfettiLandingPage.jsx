import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, ChevronDown } from 'lucide-react';

const ConfettiLandingPage = ({ onShowForm }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 16,
    hours: 5,
    minutes: 4,
    seconds: 45
  });

  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const targetDate = new Date('2025-11-26T17:30:00+08:00');
    
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

  const youtubeVideos = [
    "https://www.youtube.com/embed/e-Qampku0k8",
    "https://www.youtube.com/embed/imoH3aai_4s"
  ];

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
    { q: "1. 谁可以参加此活动？", a: "Confetti Circle Club 特别为那些渴望成长、拓展人脉、展示个人价值、寻找合作机会的宾客而设。不论你来自哪个行业，只要你认真生活、期待共创，都欢迎加入。" },
    { q: "2. 着装建议是什么？", a: "建议穿着 Smart Casual 或商务服装，展现你的专业感与品味，也更容易与他人建立好印象。" },
    { q: "3. 可以在现场交流与分享吗？", a: "当然可以！我们特别设计了多个轻松自在的交流空间，欢迎你畅所欲言，认识来自各领域的伙伴。" },
    { q: "4. 临时无法出席怎么办？", a: "名额有限，若您无法出席，请至少提前两天通知我们。您的报名资格将保留，可转为下个月的 Confetti Circle Club 参与机会。" },
    { q: "5. 如何报名参加？", a: "点击「RSVP」按钮，填写简单表单后，我们的团队将尽快联系您，确认出席与时段。" },
    { q: "6. 活动在哪里举办？", a: "活动地点为 Confetti KL。可通过 Waze 或 Google Maps 搜索 Confetti KL 导航。" }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:50px_50px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-pink-500/30 via-purple-500/20 to-transparent"></div>
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

      {/* HERO BANNER WITH POSTER */}
      <section className="relative w-full z-10 pb-8 md:pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 z-20 pointer-events-none md:block hidden"></div>
        
        <img
          src="/poster.jpeg"
          alt="Confetti Circle Club 5.0"
          className="w-full h-auto max-h-[60vh] md:max-h-[70vh] object-cover object-center object-[center_25%] md:object-[center_40%]"
        />

        {/* TEXT OVERLAY - Desktop only */}
        <div className="absolute inset-0 z-30 md:flex flex-col justify-center pointer-events-none hidden">
          <div className="px-6 md:px-10 lg:px-80">
            <div className="max-w-5xl w-full">

              {/* TITLE - Make it larger on desktop */}
              <h1 className="
                md:text-3xl
                lg:text-4xl
                xl:text-4xl
                font-black tracking-tight text-white drop-shadow-2xl leading-tight
              ">
                CONFETTI CIRCLE CLUB <span className="text-pink-400">5.0</span>
              </h1>

              {/* DESCRIPTION - Make it larger on desktop */}
              <p className="
                md:text-2xl md:mt-6 
                xl:text-xl       {/* ← even bigger */}
                lg:text-xl 
                font-medium text-purple-200 drop-shadow-lg max-w-4xl
              ">
                由 Confetti 精心打造
                <br className="md:hidden" />
                每月举办的 500+ 精英企业家交流会，
                <br className="hidden md:block lg:hidden" /><br />
                是行业信息的交流场，
                战略合作与资源整合的绝佳平台。<br /><br />
                在这里，每一次对话都能是合作机遇，<br />
                开启未来发展的无限潜能。
              </p>

            </div>
          </div>
        </div>

        {/* TEXT BELOW IMAGE - Mobile only */}
        <div className="md:hidden px-6 py-8 bg-gradient-to-b from-black/95 to-black">
          <h1 className="text-2xl font-black tracking-tight text-white leading-tight mb-4">
            CONFETTI CIRCLE CLUB <span className="text-pink-400">5.0</span>
          </h1>
          
          <p className="text-base font-medium text-purple-200 leading-relaxed">
            由 Confetti 精心打造每月举办的 500+ 精英企业家交流会，是行业信息的交流场，战略合作与资源整合的绝佳平台。
            <br /><br />
            在这里，每一次对话都能是合作机遇，开启未来发展的无限潜能。
          </p>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce md:hidden z-40">
          <ChevronDown className="w-8 h-8 text-pink-400" />
        </div>
      </section>

      {/* EVENT CARD + VIDEO */}
      <section className="relative px-4 py-12 md:py-20 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            参加 Confetti Circle Club 5.0<br />连接顶尖商业精英
          </h2>

          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-pink-500/30" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={youtubeVideos[0]}
                title="Event Highlight"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-500/30 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Confetti Circle Club 5.0
            </h1>
            <p className="text-xl mb-3">500+ 企业家 · 创新者 · 行业领袖齐聚</p>
            <p className="text-lg mb-8 text-purple-300">连接 · 启发 · 转化</p>
            
            <div className="space-y-4 text-left max-w-md mx-auto mb-10">
              <p className="flex items-center gap-3 text-base"><Calendar className="text-pink-400" /> 日期: 2025年12月22日 (星期三)</p>
              <p className="flex items-center gap-3 text-base"><Clock className="text-pink-400" /> 时间: 5:30pm - 10:00pm</p>
              <p className="flex items-center gap-3 text-base"><MapPin className="text-pink-400" /> 地点: Confetti KL Ballroom</p>
              <p className="flex items-center gap-3 text-base"><Users className="text-pink-400" /> 门票: RM159 (含6% SST)</p>
            </div>
            
            <button onClick={onShowForm}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(236,72,153,0.5)] border border-pink-400/50 text-lg">
              立即报名参加 !
            </button>
          </div>
        </div>
      </section>

      {/* MEDIA SECTION - Now with static images */}
      <section className="py-20 md:py-32 px-4 relative z-10 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-7xl mx-auto">
<div className="text-center mb-20">
  <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
    Confetti Circle Club 从 1.0 到 3.0
  </h2>
  <p className="mt-6 text-2xl md:text-3xl text-white">
    已汇聚 <span className="font-black text-pink-400">1500+</span> 位行业顶尖精英
  </p>
  <p className="mt-4 text-lg md:text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
    每一次跨界升圈，都为成员开启战略合作与资源整合的新篇章
  </p>
</div>

          <div className="space-y-24 md:space-y-32">

            {/* Row 1 - Image Left */}
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <div className="rounded-xl shadow-2xl border border-pink-500/30 overflow-hidden">
                  <img src="/media1.jpeg" alt="高效连结" className="w-full h-auto object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-4xl md:text-5xl font-bold mb-8">高效连结</h3>
                <p className="text-lg leading-relaxed">打破传统社交的沉闷，以轻松愉悦的方式促进深入对话<br />通过游戏让现场破冰互动交流，增强互动产生未来合作机会</p>
              </div>
            </div>

            {/* Row 2 - Image Right */}
            <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
              <div className="w-full md:w-1/2">
                <div className="rounded-xl shadow-2xl border border-pink-500/30 overflow-hidden">
                  <img src="/media2.jpeg" alt="轻松交流" className="w-full h-auto object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-right">
                <h3 className="text-4xl md:text-5xl font-bold mb-8">轻松交流</h3>
                <p className="text-lg leading-relaxed">高质量的环境中精准拓展您的人脉，获取可持续的合作机会<br />体验高端环境结合美酒美食，舒适欢乐进行交流</p>
              </div>
            </div>

            {/* Row 3 - New Row (Image Left again) */}
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <div className="rounded-xl shadow-2xl border border-pink-500/30 overflow-hidden">
                  <img src="/media3.jpg" alt="价值共创" className="w-full h-auto object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-4xl md:text-5xl font-bold mb-8">价值共创</h3>
                <p className="text-lg leading-relaxed">每场活动都汇聚不同领域的顶尖人才<br />在这里碰撞思想、分享资源，一次相遇可能成就长期合作</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            听听他们怎样说
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-pink-500/30">
                <div className="flex mb-4">★★★★★</div>
                <p className="italic text-gray-300 mb-6 text-sm leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-pink-400" />
                  <div>
                    <div className="font-bold text-pink-300">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">常见问题 FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-black/60 backdrop-blur-md rounded-xl border border-pink-500/30 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-pink-500/10 transition"
                >
                  <span className="font-semibold pr-8">{faq.q}</span>
                  <span className="text-2xl text-pink-400">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA + MAP */}
      <section className="py-20 md:py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Confetti Circle Club 5.0
              </h2>
              <p className="text-xl mb-8 text-purple-300">500+ 企业家 · 创新者 · 行业领袖齐聚</p>

              <div className="bg-black/60 backdrop-blur-md rounded-xl p-8 mb-10 border border-pink-500/30">
                <p><strong className="text-pink-400">日期:</strong> 2025年12月22日 (星期三)</p>
                <p className="mt-3"><strong className="text-pink-400">时间:</strong> 5:30 PM – 10:00 PM</p>
                <p className="mt-3"><strong className="text-pink-400">门票:</strong> RM159 (含6% SST)</p>
                <p className="mt-3"><strong className="text-pink-400">地点:</strong> Confetti KL Ballroom</p>
                <p className="text-sm text-gray-400 mt-4">
                  Ground floor Retail Block, Pusat Perdagangan Mines 2,<br />
                  Mines Wellness City, 43300 Seri Kembangan, Selangor.
                </p>
                <p className="mt-6">
                  <strong className="text-pink-400">WhatsApp:</strong>{' '}
                  <a href="https://wa.link/540nlz" className="text-purple-300 underline hover:text-pink-300">
                    017-6617262 (Amy)
                  </a>
                </p>
              </div>

              <button onClick={onShowForm}
                className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-5 px-16 rounded-full text-xl transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(236,72,153,0.6)]">
                REGISTER NOW
              </button>
            </div>

            <div>
              <div className="rounded-xl overflow-hidden border border-purple-500/30 shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.237868669636!2d101.7081257!3d3.0271893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdcb5ee33ac55f%3A0x5d377ad570dbc5fd!2sConfetti%20KL!5e0!3m2!1sen!2smy!4v1698765432100!5m2!1sen!2smy"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="text-center text-gray-400 mt-4 text-sm">
                Confetti KL – Mines 2, Seri Kembangan
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfettiLandingPage;