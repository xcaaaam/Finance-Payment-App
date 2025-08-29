import React, { useState } from "react";
import { paymentMethods } from "../data/paymentMethods";

const PaymentCards = () => {
  const [amount, setAmount] = useState("");

  const calculateFee = (method) => {
    let fee = method.baseFee;
    if (amount && method.threshold && parseFloat(amount) > method.threshold) {
      fee += method.extraFee;
    }
    return fee;
  };

  return (
    <div className="min-h-screen bg-neon flex flex-col items-center p-6">
      <h1 className="text-3xl text-white mb-4">Comparador de Métodos de Pago</h1>
      <input
        type="number"
        placeholder="Ingrese monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-6 p-2 rounded-md w-1/3 text-black"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {paymentMethods.map((method, index) => {
          const fee = calculateFee(method);
          return (
            <div
              key={index}
              className="relative p-6 rounded-3xl bg-[rgba(255,255,255,0.05)] backdrop-blur-md text-white flex flex-col items-center transition-all duration-500 hover:scale-105"
            >
              <img src={method.icon} alt={method.name} className="w-12 h-12 mb-2" />
              <h2 className="text-xl font-bold">{method.name}</h2>
              <p className="mt-2">Comisión: {(fee * 100).toFixed(2)}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentCards;
