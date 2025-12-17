import { useState, useEffect } from "react";

export type Package = {
  id: string;
  name: string;
  duration: string;
  price: number;
  speed: string;
  devices: number;
  highlight?: boolean;
};

export const PACKAGES: Package[] = [
  {
    id: "2h",
    name: "Paket 2 Jam",
    duration: "2 Jam",
    price: 2000,
    speed: "",
    devices: 1,
  },
  {
    id: "12h",
    name: "Paket 12 Jam",
    duration: "12 Jam",
    price: 3000,
    speed: "",
    devices: 1,
  },
  {
    id: "1d",
    name: "Paket 1 Hari",
    duration: "24 Jam",
    price: 5000,
    speed: "",
    devices: 1,
  },
  {
    id: "6d",
    name: "Paket 6 Hari",
    duration: "6 Hari",
    price: 20000,
    speed: "",
    devices: 1,
  },
  {
    id: "1m",
    name: "Paket 1 Bulan",
    duration: "30 Hari",
    price: 50000,
    speed: "",
    devices: 1,
  },
  {
    id: "install",
    name: "PASANG WIFI DI RUMAH",
    duration: "Unlimited",
    price: 150000,
    speed: "",
    devices: 99,
    highlight: true,
  },
];

export async function createTransaction(packageId: string, phone: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    reference: "TRX-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    amount: PACKAGES.find((p) => p.id === packageId)?.price || 0,
    qr_url: "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=MOCK_QRIS_DATA&choe=UTF-8",
  };
}

export async function checkPaymentStatus(reference: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // Always success for mock
  return {
    status: "PAID",
    voucher: "V-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
  };
}
