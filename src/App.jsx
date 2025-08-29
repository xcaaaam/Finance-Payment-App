
import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [method1, setMethod1] = useState("Revolut (EUR)");
  const [method2, setMethod2] = useState("Tarjeta Nacional (USD)");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Tasas de cambio (en una app real, estas se obtendrían de una API)
  const exchangeRates = {
    EUR: { USD: 1.07, EUR: 1 },
    USD: { EUR: 0.93, USD: 1 }
  };

  const handleCompare = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }

    setLoading(true);
    
    // Simulamos una pequeña demora para que se vea el estado de carga
    setTimeout(() => {
      const numericAmount = parseFloat(amount);
      
      // Calculamos costos según método seleccionado
      let cost1, cost2, explanation;
      
      if (method1.includes("Revolut")) {
        // Revolut tiene mejor tasa de cambio pero posible comisión
        cost1 = numericAmount * exchangeRates[currency].USD * 0.98; // 2% mejor
      } else {
        // Tarjeta nacional posiblemente tiene peor tasa
        cost1 = numericAmount * exchangeRates[currency].USD * 1.03; // 3% peor
      }
      
      if (method2.includes("Revolut")) {
        cost2 = numericAmount * exchangeRates[currency].USD * 0.98;
      } else {
        cost2 = numericAmount * exchangeRates[currency].USD * 1.03;
      }
      
      // Determinamos cuál es mejor
      let betterOption, difference;
      
      if (cost1 < cost2) {
        betterOption = method1;
        difference = ((cost2 - cost1) / cost2 * 100).toFixed(2);
        explanation = `El ${method1} te ahorra ${difference}% comparado con ${method2}.`;
      } else {
        betterOption = method2;
        difference = ((cost1 - cost2) / cost1 * 100).toFixed(2);
        explanation = `El ${method2} te ahorra ${difference}% comparado con ${method1}.`;
      }
      
      setResult({ 
        option: betterOption, 
        explanation,
        savings: difference
      });
      setLoading(false);
    }, 1000);
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
      <nav className="w-full flex justify-center flex-wrap gap-4 text-lg font-semibold mb-8">
        {['MÉTODO DE PAGO', 'TIPO DE CAMBIO', 'TIPS FINANZAS', 'BLOG'].map((item) => (
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
      <div className="flex flex-col space-y-4 items-center w-full max-w-md">
        <div className="relative w-full">
          <select
            className="relative px-4 py-2 rounded-2xl font-semibold text-white shadow-lg w-full bg-transparent appearance-none text-center"
            style={liquidGlassStyle}
            value={method1}
            onChange={(e) => setMethod1(e.target.value)}
          >
            <option value="Revolut (EUR)">Revolut (EUR)</option>
            <option value="Tarjeta Nacional (USD)">Tarjeta Nacional (USD)</option>
            <option value="PayPal (USD)">PayPal (USD)</option>
            <option value="Wise (EUR)">Wise (EUR)</option>
          </select>
          <span style={shimmerStyle}></span>
        </div>

        <div className="text-xl">VS</div>

        <div className="relative w-full">
          <select
            className="relative px-4 py-2 rounded-2xl font-semibold text-white shadow-lg w-full bg-transparent appearance-none text-center"
            style={liquidGlassStyle}
            value={method2}
            onChange={(e) => setMethod2(e.target.value)}
          >
            <option value="Tarjeta Nacional (USD)">Tarjeta Nacional (USD)</option>
            <option value="Revolut (EUR)">Revolut (EUR)</option>
            <option value="PayPal (USD)">PayPal (USD)</option>
            <option value="Wise (EUR)">Wise (EUR)</option>
          </select>
          <span style={shimmerStyle}></span>
        </div>

        <div className="flex gap-2 w-full">
          <div className="relative w-2/3">
            <input
              type="number"
              placeholder="Monto"
              className="relative px-4 py-2 rounded-2xl font-semibold text-white shadow-lg w-full text-center bg-transparent placeholder-gray-300"
              style={liquidGlassStyle}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span style={shimmerStyle}></span>
          </div>
          <div className="relative w-1/3">
            <select
              className="relative px-4 py-2 rounded-2xl font-semibold text-white shadow-lg w-full bg-transparent appearance-none text-center"
              style={liquidGlassStyle}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
            <span style={shimmerStyle}></span>
          </div>
        </div>

        <button
          onClick={handleCompare}
          disabled={loading}
          className="relative px-8 py-3 rounded-2xl font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={liquidGlassStyle}
        >
          {loading ? "Calculando..." : "Comparar"}
          <span style={shimmerStyle}></span>
        </button>
      </div>

      {/* Result */}
      {result && (
        <motion.div 
          className="mt-8 p-6 rounded-2xl max-w-md w-full"
          style={liquidGlassStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-green-400 text-2xl font-bold">{result.option}</p>
          <p className="text-gray-300 mt-2">{result.explanation}</p>
          <div className="mt-4 bg-green-900 bg-opacity-20 p-3 rounded-lg">
            <p className="text-sm">Ahorro estimado: <span className="font-bold">{result.savings}%</span></p>
          </div>
        </motion.div>
      )}

      {/* Información adicional */}
      <div className="mt-8 text-sm text-gray-400 max-w-md">
        <p>💡 Consejo: Las fintech como Revolut suelen tener mejores tasas de cambio para pagos internacionales.</p>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-400">
        A product of Seven Sides, by <a href="https://www.instagram.com/xcaaaam/" target="_blank" className="text-blue-400 hover:underline">@xcaaaam</a>
      </footer>
    </motion.div>
  );
}

import PaymentCards from "./components/PaymentCards";

function App() {
  return <PaymentCards />;
}

export default App;
