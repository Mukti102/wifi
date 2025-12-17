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
    id: "1h",
    name: "Paket Kilat",
    duration: "1 Jam",
    price: 2000,
    speed: "5 Mbps",
    devices: 1,
  },
  {
    id: "1d",
    name: "Paket Harian",
    duration: "24 Jam",
    price: 5000,
    speed: "10 Mbps",
    devices: 1,
  },
  {
    id: "1w",
    name: "Paket Mingguan",
    duration: "7 Hari",
    price: 30000,
    speed: "15 Mbps",
    devices: 2,
  },
  {
    id: "1m",
    name: "Paket Keluarga",
    duration: "30 Hari",
    price: 150000,
    speed: "20 Mbps",
    devices: 4,
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
