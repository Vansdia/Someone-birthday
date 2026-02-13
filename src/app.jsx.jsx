import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Gift, Star, Lock, X, Volume2, VolumeX } from 'lucide-react';

export default function BirthdayZahwah() {
  const [stage, setStage] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [password, setPassword] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [buttonPos, setButtonPos] = useState({ x: 50, y: 50 });
  const [noButtonPos, setNoButtonPos] = useState({ x: 30, y: 50 });
  const [fakeLoading, setFakeLoading] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaAnswer2, setCaptchaAnswer2] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  // Track mouse for heart trail (only at final stage)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (stage >= 7 && Math.random() > 0.85) {
        const newHeart = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY
        };
        setHearts(prev => [...prev, newHeart]);
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [stage]);

  // Annoying alert on first load
  useEffect(() => {
    if (!alertShown) {
      setTimeout(() => {
        alert('Halo Zahwah! Ada yang mau kasih sesuatu nih...');
        setTimeout(() => {
          alert('Tapi... harus ngerjain beberapa challenge dulu 😈');
          setAlertShown(true);
        }, 500);
      }, 1000);
    }
  }, [alertShown]);

  // STAGE 0: Password Challenge
  const handlePasswordSubmit = () => {
    const correctPasswords = ['zahwah', 'sayang', 'cantik', 'princess', 'baby'];
    if (correctPasswords.some(p => password.toLowerCase().includes(p))) {
      setStage(1);
    } else {
      alert('Salah. Hint: siapa nama kamu?');
    }
  };

  // STAGE 1: Annoying Captcha - Calculus Edition
  const handleCaptchaSubmit = () => {
    // Question 1: Derivative of x^2 at x=3 is 6
    // Question 2: Integral of 2x from 0 to 2 is 4
    if (parseInt(captchaAnswer) === 6 && parseInt(captchaAnswer2) === 4) {
      setStage(2);
    } else {
      alert('Salah! Coba inget lagi pelajaran kalkulus 😂');
    }
  };

  // STAGE 2: Fake Loading
  useEffect(() => {
    if (stage === 2 && fakeLoading < 100) {
      const timer = setTimeout(() => {
        setFakeLoading(prev => {
          // Make it slow and annoying
          const increment = Math.random() * 3 + 1;
          const newValue = Math.min(prev + increment, 100);
          if (newValue >= 100) {
            setTimeout(() => setStage(3), 1000);
          }
          return newValue;
        });
      }, Math.random() * 200 + 100);
      return () => clearTimeout(timer);
    }
  }, [stage, fakeLoading]);

  // STAGE 3: Quiz about boyfriend
  const handleQuizSubmit = () => {
    // All answers work, but make it fun
    const allAnswered = Object.keys(quizAnswers).length >= 3;
    if (allAnswered) {
      setStage(4);
    } else {
      alert('Isi semua dulu dong!');
    }
  };

  // STAGE 4: Yes or No (but No runs away)
  const handleNoHover = () => {
    const newX = Math.random() * 70 + 10;
    const newY = Math.random() * 70 + 10;
    setNoButtonPos({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    setStage(5);
  };

  // STAGE 5: Click spam challenge
  const handleSpamClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 29) {
      setStage(6);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  // STAGE 6: Sound toggle trick
  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      setTimeout(() => setStage(7), 1000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      fontFamily: "'Playfair Display', serif"
    }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.2 + Math.random() * 0.3
            }}
          >
            <Star size={6 + Math.random() * 10} fill="white" color="white" />
          </div>
        ))}
      </div>

      {/* Mouse trail hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute pointer-events-none z-50"
          style={{
            left: heart.x,
            top: heart.y,
            animation: 'floatUp 2s ease-out forwards'
          }}
        >
          <Heart size={24} fill="#ff1493" color="#ff1493" />
        </div>
      ))}

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: -20,
                animation: `fall ${2 + Math.random() * 2}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            >
              <Sparkles size={20} color={['#ff69b4', '#ffd700', '#ff1493', '#00ffff', '#fff'][Math.floor(Math.random() * 5)]} />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          
          {/* STAGE 0: Password */}
          {stage === 0 && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="mb-8">
                <Lock size={60} className="mx-auto text-yellow-300 animate-bounce" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4"
                  style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                Halo! 👋
              </h1>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <p className="text-xl text-white/90 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Masukkan password dulu
                </p>
                
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                  placeholder="Password..."
                  className="w-full px-6 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400 text-center"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
                
                <button
                  onClick={handlePasswordSubmit}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-lg"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Unlock 🔓
                </button>
                
                <p className="text-sm text-white/60 mt-4">
                  Hint: siapa nama kamu
                </p>
              </div>
            </div>
          )}

          {/* STAGE 1: Annoying Captcha */}
          {stage === 1 && (
            <div className="text-center space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-4">
                Tunggu dulu! 🤖
              </h2>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <p className="text-xl text-white/90 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Sebentar, buktikan dulu kamu bukan bot
                </p>
                
                <div className="space-y-6">
                  <div className="bg-white/20 rounded-2xl p-6">
                    <p className="text-xl font-bold text-white mb-2">
                      1. Jika f(x) = x², maka f'(3) = ?
                    </p>
                    <p className="text-sm text-white/70 mb-4">
                      (Turunan sederhana)
                    </p>
                    <input
                      type="number"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      placeholder="Jawaban..."
                      className="w-full px-6 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>

                  <div className="bg-white/20 rounded-2xl p-6">
                    <p className="text-xl font-bold text-white mb-2">
                      2. ∫₀² 2x dx = ?
                    </p>
                    <p className="text-sm text-white/70 mb-4">
                      (Integral tentu)
                    </p>
                    <input
                      type="number"
                      value={captchaAnswer2}
                      onChange={(e) => setCaptchaAnswer2(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCaptchaSubmit()}
                      placeholder="Jawaban..."
                      className="w-full px-6 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleCaptchaSubmit}
                  className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-lg"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Submit ✓
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: Fake Loading */}
          {stage === 2 && (
            <div className="text-center space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-4">
                Loading... 🐌
              </h2>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <p className="text-xl text-white/90 mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Loading...
                </p>
                
                <div className="w-full bg-white/20 rounded-full h-8 mb-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-300 flex items-center justify-center text-white font-bold"
                    style={{ width: `${fakeLoading}%` }}
                  >
                    {Math.floor(fakeLoading)}%
                  </div>
                </div>
                
                <p className="text-sm text-white/70">
                  Koneksi lagi lambat nih...
                </p>
                <p className="text-xs text-white/50 mt-2">
                  (Bercanda, ini emang dibuat lambat 😈)
                </p>
              </div>
            </div>
          )}

          {/* STAGE 3: Quiz about boyfriend */}
          {stage === 3 && (
            <div className="text-center space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-4">
                Kuis Kilat! 📝
              </h2>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-left">
                <p className="text-xl text-white/90 mb-6 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Jawab beberapa pertanyaan dulu!
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-white/90 block mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      1. Apa yang paling kamu inget dari kita?
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setQuizAnswers({...quizAnswers, q1: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                  
                  <div>
                    <label className="text-white/90 block mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      2. Hal random yang pengen kamu lakuin bareng aku?
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setQuizAnswers({...quizAnswers, q2: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                  
                  <div>
                    <label className="text-white/90 block mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      3. Satu kata buat aku?
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setQuizAnswers({...quizAnswers, q3: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleQuizSubmit}
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-lg"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Submit Jawaban 📤
                </button>
              </div>
            </div>
          )}

          {/* STAGE 4: Yes or No (No runs away) */}
          {stage === 4 && (
            <div className="text-center space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-4">
                Pertanyaan Penting! 💭
              </h2>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 relative h-96">
                <p className="text-2xl text-white/90 mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Lanjut gak?
                </p>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleYesClick}
                    className="bg-gradient-to-r from-green-400 to-green-600 text-white px-12 py-4 rounded-full font-bold text-xl hover:scale-110 transition-all shadow-lg"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    YES! 🎉
                  </button>
                  
                  <button
                    onMouseEnter={handleNoHover}
                    className="absolute bg-gradient-to-r from-red-400 to-red-600 text-white px-12 py-4 rounded-full font-bold text-xl transition-all duration-200 shadow-lg"
                    style={{
                      left: `${noButtonPos.x}%`,
                      top: `${noButtonPos.y}%`,
                      transform: 'translate(-50%, -50%)',
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  >
                    No...
                  </button>
                </div>
                
                <p className="text-sm text-white/60 mt-16">
                  Choose wisely...
                </p>
              </div>
            </div>
          )}

          {/* STAGE 5: Click Spam */}
          {stage === 5 && (
            <div className="text-center space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-4">
                Hampir Selesai! 💪
              </h2>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <p className="text-xl text-white/90 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Sekarang... klik tombol ini 30 kali! 😈
                </p>
                
                <button
                  onClick={handleSpamClick}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-12 py-6 rounded-full font-bold text-2xl hover:scale-110 active:scale-95 transition-all shadow-2xl animate-pulse-slow"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  KLIK! 👆
                </button>
                
                <div className="mt-6">
                  <div className="text-5xl font-bold text-white mb-2">
                    {clickCount} / 30
                  </div>
                  <p className="text-white/70">
                    Tinggal {30 - clickCount} lagi
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 6: Sound Toggle */}
          {stage === 6 && (
            <div className="text-center space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-4">
                Terakhir! 🔊
              </h2>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <p className="text-xl text-white/90 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Nyalain soundnya!
                </p>
                
                <button
                  onClick={handleSoundToggle}
                  className={`${soundEnabled ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'} text-white px-12 py-6 rounded-full font-bold text-xl hover:scale-110 transition-all shadow-lg flex items-center gap-3 mx-auto`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {soundEnabled ? <Volume2 size={32} /> : <VolumeX size={32} />}
                  {soundEnabled ? 'Sound ON 🔊' : 'Sound OFF 🔇'}
                </button>
                
                <p className="text-sm text-white/60 mt-6">
                  (Gak ada suara beneran kok, just for fun)
                </p>
              </div>
            </div>
          )}

          {/* STAGE 7: Final Birthday Message */}
          {stage === 7 && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="mb-6 animate-bounce-slow">
                <Gift size={100} className="mx-auto text-yellow-300 drop-shadow-glow" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-gradient"
                  style={{ 
                    textShadow: '0 0 40px rgba(255,255,255,0.6)',
                    background: 'linear-gradient(45deg, #fff, #ffd700, #ff69b4, #fff, #ffd700)',
                    backgroundSize: '300% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                🎉 ZAHWAH! 🎉
              </h1>

              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 border-2 border-white/30 space-y-6 shadow-2xl">
                <h2 className="text-5xl font-bold text-white mb-6 animate-pulse">
                  Selamat Ulang Tahun! 🎂✨
                </h2>
                
                <div className="space-y-5 text-white/95 text-lg leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <p>
                    Okay maaf ya kalau tadi agak annoying 😂
                    Tapi setidaknya jadi unik kan experience-nya...
                  </p>
                  
                  <div className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-2xl p-8 my-6 border border-white/20">
                    <p className="text-2xl md:text-3xl font-semibold text-white leading-relaxed">
                      Happy birthday, Zahwah.
                      <br/><br/>
                      Semoga tahun ini jadi tahun yang lebih baik lagi.
                      Semoga kamu selalu sehat, bahagia, dan semua yang kamu mau bisa tercapai.
                      <br/><br/>
                      Thanks udah jadi bagian dari hidup aku. 
                    </p>
                  </div>

                  <p>
                    Itu aja sih yang mau aku sampaikan. Simple tapi dari hati.
                  </p>

                  <div className="pt-8 space-y-4">
                    <div className="text-3xl font-bold text-white">
                      Have a great day! 🎂
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-4 gap-3">
                {['🎈', '🎊', '🎁', '🎉', '🥳', '💝', '🌟', '✨', '🎂', '🍰', '🎀', '💖'].map((emoji, i) => (
                  <span
                    key={i}
                    className="text-5xl animate-bounce"
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: `${1 + Math.random()}s`
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>

              <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <p className="text-white/90 text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  📊 <strong>Recap:</strong> Challenge yang udah kamu selesaiin:
                </p>
                <ul className="text-white/80 text-sm mt-3 space-y-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <li>✓ Masukin password</li>
                  <li>✓ Ngerjain 2 soal kalkulus</li>
                  <li>✓ Nunggu loading (yang ternyata palsu)</li>
                  <li>✓ Jawab kuis</li>
                  <li>✓ Gagal klik tombol "No" berkali-kali</li>
                  <li>✓ Spam klik 30 kali</li>
                  <li>✓ Nyalain sound yang gak ada</li>
                </ul>
                <p className="text-white/70 text-sm mt-4">
                  Not bad 👍
                </p>
              </div>

              <p className="text-white/70 text-sm mt-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                P.S. Gerakin mouse-nya, ada easter egg kecil
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;600;700;800&display=swap');
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.5) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-120px) scale(1.3) rotate(20deg);
          }
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.1);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
          100% {
            background-position: 0% center;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-float-up {
          animation: floatUp 2s ease-out forwards;
        }

        .animate-fall {
          animation: fall 3s linear forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-gradient {
          animation: gradient 4s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.8));
        }

        input::placeholder {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
