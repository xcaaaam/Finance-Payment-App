export const paymentMethods = [
  { name: "Tarjeta Nacional (USD)", icon: "/icons/visa.svg", baseFee: 0, extraFee: 0.05, currency: "USD", threshold: 100 },
  { name: "Tarjeta Internacional (EUR)", icon: "/icons/mastercard.svg", baseFee: 0.02, extraFee: 0, currency: "EUR" },
  { name: "PayPal", icon: "/icons/paypal.svg", baseFee: 0.04, extraFee: 0, currency: "USD" },
  { name: "Wise", icon: "/icons/wise.svg", baseFee: 0.01, extraFee: 0, currency: "USD" },
  { name: "Revolut", icon: "/icons/revolut.svg", baseFee: 0, extraFee: 0, currency: "USD" },
  { name: "Crypto (USDT)", icon: "/icons/crypto.svg", baseFee: 0.005, extraFee: 0, currency: "USDT" },
  { name: "Apple Pay", icon: "/icons/applepay.svg", baseFee: 0, extraFee: 0, currency: "USD" },
  { name: "Google Pay", icon: "/icons/googlepay.svg", baseFee: 0, extraFee: 0, currency: "USD" },
  { name: "Western Union", icon: "/icons/westernunion.svg", baseFee: 0.08, extraFee: 0, currency: "USD" },
  { name: "SWIFT", icon: "/icons/bank.svg", baseFee: 0.03, extraFee: 0, currency: "USD" },
];
