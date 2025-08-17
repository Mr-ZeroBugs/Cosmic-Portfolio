import React, { useState, useRef, useEffect } from 'react';

interface HistoryItem {
  type: 'input' | 'output';
  text: string;
}

const Terminal = () => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', text: 'QUANTUM TERMINAL v3.14 • REALITY.EXE LOADED\nType `help` to explore the digital void.' }
  ]);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [initPhase, setInitPhase] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);

  // Security scan sequence
  useEffect(() => {
    const securityScan = async () => {
      // Phase 1: Threat detected (0-0.5s)
      setTimeout(() => setInitPhase(1), 100);
      
      // Phase 2: Scanning (0.5-2s) 
      setTimeout(() => setInitPhase(2), 500);
      
      // Phase 3: Analysis (2-2.8s)
      setTimeout(() => setInitPhase(3), 2000);
      
      // Phase 4: Success (2.8-3.5s)
      setTimeout(() => setInitPhase(4), 2800);
      
      // Phase 5: System ready (3.5s+)
      setTimeout(() => {
        setInitPhase(5);
        setIsInitializing(false);
      }, 3500);
    };

    securityScan();
  }, []);

  // Digital glitch effect
  useEffect(() => {
    if (!isInitializing) {
      const glitchInterval = setInterval(() => {
        if (Math.random() < 0.05) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 100 + Math.random() * 200);
        }
      }, 1000);

      return () => clearInterval(glitchInterval);
    }
  }, [isInitializing]);

  // Force scroll to bottom on history update
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (command: string): void => {
    let output = '';
    const newHistory: HistoryItem[] = [...history, { type: 'input', text: command }];

    switch (command.toLowerCase()) {
      case 'help':
        output = `AVAILABLE QUANTUM COMMANDS:
┌─────────────────────────────────────┐
│ whoami     │ Reveal digital identity │
│ projects   │ Navigate to creations   │
│ skills     │ Display capabilities    │
│ contact    │ Send quantum message    │
│ reality    │ Question existence      │
│ matrix     │ Enter the code realm    │
│ clear      │ Purge memory banks      │
└─────────────────────────────────────┘`;
        break;
      case 'whoami':
        output = `> SCANNING IDENTITY...
> ANALYZING QUANTUM SIGNATURE...
> IDENTITY: KONGPOP PIPATPUSIT
> STATUS: WORKING NO SLEEPING
> ROLE: Cybersecurity, Philosopher, Investor, Innovator
> EXPLORING: The convergence of philosophy, technology, and finance`;
        break;
      case 'projects':
        output = '> ACCESSING PROJECT DATABASE...\n> NAVIGATING TO DIGITAL CREATIONS...';
        break;
      case 'skills':
        output = `> QUANTUM SKILL MATRIX LOADED:
╭─ Skills ────────────────────────────╮
│ ● Coding        [████████████] 95%  │
│ ● Philosophy    [███████████ ] 90%  │
│ ● Investment    [████████████] 92%  │
│ ● Math          [██████████  ] 85%  │
│ ● Chess         [████████    ] 80%  │
│ ● English       [█████████   ] 88%  │
╰─────────────────────────────────────╯
> SPECIALIZATION: Building digital realities`;
        break;
      case 'contact':
        output = '> INITIALIZING QUANTUM COMMUNICATION...\n> OPENING PORTAL TO CONTACT DIMENSION...';
        break;
      case 'reality':
        output = `> PHILOSOPHICAL QUERY DETECTED...
> PROCESSING EXISTENTIAL PARAMETERS...

"What is real? How do you define real?
If you're talking about what you can feel, what you can smell, what you can taste and see, then real is simply electrical signals interpreted by your brain."

> ARE YOU SURE YOU WANT TO CONTINUE? [Y/N]`;
        break;
      case 'matrix':
        output = `> ENTERING THE MATRIX...
> 01001000 01100101 01101100 01101100 01101111
> WELCOME TO THE DESERT OF THE REAL
> REALITY IS LOADING...`;
        break;
      case 'clear':
        setHistory([{ type: 'output', text: '> MEMORY BANKS PURGED\n> QUANTUM STATE RESET\n> REALITY.EXE RELOADED' }]);
        return;
      case 'y':
      case 'yes':
        output = `> ACCESSING DEEPER LEVELS...
> WARNING: RABBIT HOLE DETECTED
> "There is no spoon"
> CONSCIOUSNESS = SIMULATION.QUERY(self)`;
        break;
      default:
        output = `> ERROR: COMMAND '${command}' NOT FOUND IN QUANTUM DATABASE
> TIP: TYPE 'help' TO VIEW AVAILABLE REALITY FUNCTIONS
> OR PERHAPS THIS COMMAND EXISTS IN ANOTHER DIMENSION...`;
    }
    
    setHistory([...newHistory, { type: 'output', text: output }]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input.trim() === '' || isInitializing) return;
    handleCommand(input);
    setInput('');
  };

  const getInitAnimation = (): string => {
    switch (initPhase) {
      case 0:
        return 'opacity-0 scale-95';
      case 1:
        return 'opacity-100 scale-100 border-red-500 animate-threat-detected';
      case 2:
        return 'opacity-100 scale-100 border-yellow-400 animate-scanning';
      case 3:
        return 'opacity-100 scale-100 border-blue-400 animate-analyzing';
      case 4:
        return 'opacity-100 scale-100 border-green-400 animate-success';
      case 5:
        return 'opacity-100 scale-100 border-cyan-400/30 animate-system-ready';
      default:
        return 'opacity-100 scale-100 border-cyan-400/30';
    }
  };

  return (
    <div className="relative">
      {/* Initialization overlay effects */}
      {isInitializing && (
        <>
          {/* Security scan overlay */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* Threat detected overlay */}
            {initPhase === 1 && (
              <div className="absolute inset-0 bg-red-500/10 animate-pulse border-2 border-red-500 rounded-lg" />
            )}
            
            {/* Scanning lines */}
            {(initPhase === 2 || initPhase === 3) && (
              <>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-scan-horizontal" />
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent animate-scan-vertical" />
              </>
            )}
            
            {/* Success glow */}
            {initPhase === 4 && (
              <div className="absolute inset-0 bg-green-400/5 border-2 border-green-400 rounded-lg animate-success-glow" />
            )}
          </div>

          {/* Security scan text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-mono text-center z-30">
            {initPhase === 1 && (
              <div className="text-red-400 text-lg font-bold animate-bounce">
                ⚠️ THREAT DETECTED ⚠️
                <div className="text-sm mt-2">UNAUTHORIZED ACCESS ATTEMPT</div>
              </div>
            )}
            
            {initPhase === 2 && (
              <div className="text-yellow-400 text-base">
                🔍 SCANNING SYSTEM...
                <div className="text-sm mt-2 animate-pulse">ANALYZING SECURITY PROTOCOLS</div>
                <div className="mt-2 flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0s'}} />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}} />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0.4s'}} />
                </div>
              </div>
            )}
            
            {initPhase === 3 && (
              <div className="text-blue-400 text-base">
                🔬 DEEP ANALYSIS
                <div className="text-sm mt-2">QUANTUM SIGNATURE VERIFICATION</div>
                <div className="mt-2 text-xs">
                  [████████████████████] 100%
                </div>
              </div>
            )}
            
            {initPhase === 4 && (
              <div className="text-green-400 text-lg font-bold animate-pulse">
                ✅ ACCESS GRANTED
                <div className="text-sm mt-2">WELCOME TO THE QUANTUM REALM</div>
              </div>
            )}
          </div>
        </>
      )}

      <div 
        ref={containerRef}
        className={`h-96 w-full max-w-3xl bg-black/30 backdrop-blur-lg p-6 overflow-y-auto font-mono text-sm border-2 border-cyan-400/30 rounded-lg shadow-2xl relative transition-all duration-1000 ${
          glitchActive ? 'animate-pulse border-cyan-300 shadow-cyan-400/50' : ''
        } ${getInitAnimation()}`}
        onClick={() => !isInitializing && inputRef.current?.focus()}
        style={{
          boxShadow: glitchActive 
            ? '0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1)' 
            : '0 0 20px rgba(0, 255, 255, 0.1), inset 0 0 20px rgba(0, 255, 255, 0.05)',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 20, 40, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)'
        }}
      >
        {/* Holographic scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan" />
        </div>
        
        {/* Digital grid overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Corner decorations with security state */}
        <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 transition-all duration-300 ${
          initPhase === 1 ? 'border-red-500 animate-pulse' :
          initPhase === 2 || initPhase === 3 ? 'border-yellow-400 animate-pulse' :
          initPhase === 4 ? 'border-green-400 animate-pulse' :
          'border-cyan-400/60 animate-corner-glow'
        }`} />
        <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 transition-all duration-300 ${
          initPhase === 1 ? 'border-red-500 animate-pulse' :
          initPhase === 2 || initPhase === 3 ? 'border-yellow-400 animate-pulse' :
          initPhase === 4 ? 'border-green-400 animate-pulse' :
          'border-cyan-400/60 animate-corner-glow'
        }`} />
        <div className={`absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 transition-all duration-300 ${
          initPhase === 1 ? 'border-red-500 animate-pulse' :
          initPhase === 2 || initPhase === 3 ? 'border-yellow-400 animate-pulse' :
          initPhase === 4 ? 'border-green-400 animate-pulse' :
          'border-cyan-400/60 animate-corner-glow'
        }`} />
        <div className={`absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 transition-all duration-300 ${
          initPhase === 1 ? 'border-red-500 animate-pulse' :
          initPhase === 2 || initPhase === 3 ? 'border-yellow-400 animate-pulse' :
          initPhase === 4 ? 'border-green-400 animate-pulse' :
          'border-cyan-400/60 animate-corner-glow'
        }`} />

        <div className="relative z-10">
          {!isInitializing && history.map((line, index) => (
            <div key={index} className="mb-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              {line.type === 'input' ? (
                <div className="flex">
                  <span className="text-orange-400 font-bold">quantum@void:~$</span>
                  <p className="flex-1 ml-2 text-cyan-300">{line.text}</p>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-cyan-100/90 leading-relaxed text-xs">
                  {line.text}
                </pre>
              )}
            </div>
          ))}
          
          {!isInitializing && (
            <form onSubmit={handleSubmit}>
              <div className="flex mt-2 animate-fade-in-up">
                <span className="text-orange-400 font-bold">
                  quantum@void:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (input.trim() === '' || isInitializing) return;
                      handleCommand(input);
                      setInput('');
                    }
                  }}
                  className="bg-transparent border-none text-cyan-300 flex-1 ml-2 p-0 focus:ring-0 focus:outline-none"
                  autoComplete="off"
                  style={{ caretColor: '#00FFFF' }}
                />
                <div className={`w-2 h-4 bg-cyan-400 ${glitchActive ? 'animate-ping' : 'animate-pulse'}`} />
              </div>
            </form>
          )}
        </div>

        <style jsx>{`
          @keyframes scan {
            0% { top: -2px; opacity: 1; }
            50% { opacity: 0.5; }
            100% { top: 100%; opacity: 0; }
          }
          
          @keyframes scan-horizontal {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          @keyframes scan-vertical {
            0% { top: -100%; }
            100% { top: 100%; }
          }
          
          @keyframes threat-detected {
            0%, 100% { 
              transform: scale(1);
              box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
            }
            50% { 
              transform: scale(1.02);
              box-shadow: 0 0 40px rgba(239, 68, 68, 0.8);
            }
          }
          
          @keyframes scanning {
            0%, 100% { 
              box-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
            }
            50% { 
              box-shadow: 0 0 30px rgba(251, 191, 36, 0.6);
            }
          }
          
          @keyframes analyzing {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
            }
            50% { 
              box-shadow: 0 0 35px rgba(59, 130, 246, 0.7);
            }
          }
          
          @keyframes success {
            0% { 
              transform: scale(1);
              box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
            }
            50% { 
              transform: scale(1.05);
              box-shadow: 0 0 50px rgba(34, 197, 94, 0.8);
            }
            100% { 
              transform: scale(1);
              box-shadow: 0 0 25px rgba(34, 197, 94, 0.5);
            }
          }
          
          @keyframes success-glow {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
          }
          
          @keyframes system-ready {
            0% { 
              transform: scale(1);
              filter: brightness(1.2);
            }
            100% { 
              transform: scale(1);
              filter: brightness(1);
            }
          }
          
          @keyframes corner-glow {
            0%, 100% { 
              box-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
            }
            50% { 
              box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
            }
          }
          
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-scan { animation: scan 4s linear infinite; }
          .animate-scan-horizontal { animation: scan-horizontal 1.5s linear infinite; }
          .animate-scan-vertical { animation: scan-vertical 2s linear infinite; }
          .animate-threat-detected { animation: threat-detected 0.5s ease-in-out infinite; }
          .animate-scanning { animation: scanning 1s ease-in-out infinite; }
          .animate-analyzing { animation: analyzing 0.8s ease-in-out infinite; }
          .animate-success { animation: success 1s ease-out forwards; }
          .animate-success-glow { animation: success-glow 1s ease-in-out infinite; }
          .animate-system-ready { animation: system-ready 0.5s ease-out forwards; }
          .animate-corner-glow { animation: corner-glow 2s ease-in-out infinite; }
          .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        `}</style>
      </div>
    </div>
  );
};

export default Terminal;