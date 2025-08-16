// app/components/Terminal.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'QUANTUM TERMINAL v3.14 • REALITY.EXE LOADED\nType `help` to explore the digital void.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [glitchActive, setGlitchActive] = useState(false);

  // Digital glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.05) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100 + Math.random() * 200);
      }
    }, 1000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Force scroll to bottom on history update
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (command: string) => {
    let output = '';
    const newHistory = [...history, { type: 'input', text: command }];

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
        setTimeout(() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
        break;
      case 'skills':
        output = `> QUANTUM SKILL MATRIX LOADED:
╭─ Skills ────────────────────────────╮
│ ● Coding        [████████████] 95%  │
│ ● Philosophy    [███████████ ] 90%  │
│ ● Invesment     [████████████] 92%  │
│ ● Math          [██████████  ] 85%  │
│ ● Chess         [████████    ] 80%  │
│ ● Engl          [█████████   ] 88%  │
╰─────────────────────────────────────╯
> SPECIALIZATION: Building digital realities`;
        break;
      case 'contact':
        output = '> INITIALIZING QUANTUM COMMUNICATION...\n> OPENING PORTAL TO CONTACT DIMENSION...';
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    handleCommand(input);
    setInput('');
  };

  return (
    <div 
      ref={containerRef}
      className={`h-96 w-full max-w-3xl bg-black/30 backdrop-blur-lg p-6 overflow-y-auto font-mono text-sm border-2 border-cyan-400/30 rounded-lg shadow-2xl relative transition-all duration-300 ${
        glitchActive ? 'animate-pulse border-cyan-300 shadow-cyan-400/50' : ''
      }`}
      onClick={() => inputRef.current?.focus()}
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

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60" />

      <div className="relative z-10">
        {history.map((line, index) => (
          <div key={index} className="mb-1">
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
        
        <form onSubmit={handleSubmit} className="flex mt-2">
          <label htmlFor="command-input" className="text-orange-400 font-bold">
            quantum@void:~$
          </label>
          <input
            ref={inputRef}
            id="command-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none text-cyan-300 flex-1 ml-2 p-0 focus:ring-0 focus:outline-none"
            autoComplete="off"
            style={{ caretColor: '#00FFFF' }}
          />
          <div className={`w-2 h-4 bg-cyan-400 ${glitchActive ? 'animate-ping' : 'animate-pulse'}`} />
        </form>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: -2px; opacity: 1; }
          50% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Terminal;