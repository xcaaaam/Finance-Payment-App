import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [method1, setMethod1] = useState("Revolut (EUR)");
  const [method2, setMethod2] = useState("Tarjeta Nacional (USD)");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(null);

  const handleCompare = () => {
    // Simulación lógica simple
    let explanation = "";
    let betterOption = "";

    const rateRevolut = 1.07;
    const rateBank = 1.03;

    const costRevolut = amount / rateRevolut;
    const costBank = amount / rateBank;

    if (costRevolut < costBank) {
      betterOption = "Revolut (EUR)";
      explanation = "El uso de Revolut es más recomendado por el tipo de cambio del día de hoy.";
    } else {
      betterOption = "Tarjeta Nacional (USD)";
      explanation = "La tarjeta ecuatoriana es más conveniente para este pago en dólares.";
    }

    setResult({ option: betterOption, explanation });
  };

  const liquidGlassStyle = {
    position: "relative",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
  };

  const shimmerStyle = {
    position: "absolute",
    top: 0,
    left: "-150%",
    width: "150%",
    height: "100%",
    background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)",
    animation: "shimmer 2.5s infinite",
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-center flex flex-col items-center justify-start p-8 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <style>{`
        @keyframes shimmer {
          0% { left: -150%; }
          50% { left: 100%; }
          100% { left: 150%; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="w-full flex justify-center space-x-8 text-lg font-semibold mb-8">
        {['METODO DE PAGO','TIPO DE CAMBIO','TIPS FINANZA','BLOG'].map((item) => (
          <button
            key={item}
            className="relative px-4 py-2 rounded-2xl font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300"
            style={liquidGlassStyle}
          >
            {item}
            <span style={shimmerStyle}></span>
          </button>
        ))}
      </nav>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">Personal Finance for Dummies</h1>
      <h2 className="text-2xl mb-6">¿Qué método de pago te conviene?</h2>

      {/* Inputs */}
      <div className="flex flex-col space-y-4 items-center">
        <div className="relative w-60">
          <select
            className="relative px-4 py-2 rounded-2xl font-semibold text-white shadow-lg w-full bg-transparent appearance-none"
            style={liquidGlassStyle}
            value={method1}
            onChange={(e) => setMethod1(e.target.value)}
          >
            <option className="text-black">Revolut (EUR)</option>
            <option className="text-black">Tarjeta Nacional (USD)</option>
          </select>
          <span style={shimmerStyle}></span>
        </div>

        <div className="relative w-60">
          <select
            className="relative px-4 py-2 rounded-2xl font-semibold text-white shadow-lg w-full bg-transparent appearance-none"
            style={liquidGlassStyle}
            value={method2}
            onChange={(e) => setMethod2(e.target.value)}
          >
            <option className="text-black">Tarjeta Nacional (USD)</option>
            <option className="text-black">Revolut (EUR)</option>
          </select>
          <span style={shimmerStyle}></span>
        </div>

        <div className="relative w-60">
          <input
            type="number"
            placeholder="Monto en EUR"
            className="relative px-4 py-2 rounded-2xl font-semibold text-white shadow-lg w-full text-center bg-transparent placeholder-gray-300"
            style={liquidGlassStyle}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span style={shimmerStyle}></span>
        </div>

        <button
          onClick={handleCompare}
          className="relative px-8 py-3 rounded-2xl font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300"
          style={liquidGlassStyle}
        >
          <span className="relative z-10">Comparar</span>
          <span style={shimmerStyle}></span>
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-8">
          <p className="text-green-400 text-2xl font-bold">{result.option}</p>
          <p className="text-gray-300 mt-2">{result.explanation}</p>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-400">
        A product of Seven Sides, by <a href="https://www.instagram.com/xcaaaam/" target="_blank" className="text-blue-400 hover:underline">@xcaaaam</a>
      </footer>
    </motion.div>
  );
}
