import { useState } from "react";
import { useLocation } from "wouter";
import { PACKAGES, createTransaction } from "@/lib/mock-api";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Smartphone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Checkout() {
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkg || !phone) {
      toast({
        title: "Mohon lengkapi data",
        description: "Pilih paket dan masukkan nomor WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const trx = await createTransaction(selectedPkg, phone);
      // Pass data via location state (simulated by query params or local storage for this mock)
      localStorage.setItem("currentTrx", JSON.stringify({ ...trx, packageId: selectedPkg, phone }));
      setLocation(`/payment?ref=${trx.reference}`);
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal membuat transaksi. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
            Pilih Paket Internet
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nikmati koneksi cepat dan stabil dengan harga terjangkau. Pilih paket yang sesuai dengan kebutuhanmu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`relative h-full flex flex-col transition-all cursor-pointer border-2 ${
                  selectedPkg === pkg.id 
                    ? "border-primary bg-primary/5 shadow-2xl shadow-primary/10 scale-[1.02]" 
                    : "border-border hover:border-primary/50 hover:bg-accent/5"
                } ${pkg.highlight ? "lg:-mt-4 lg:mb-4 z-10" : ""}`}
                onClick={() => setSelectedPkg(pkg.id)}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm shadow-lg shadow-primary/25">
                      Paling Laris
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between">
                    <span>{pkg.name}</span>
                  </CardTitle>
                  <CardDescription className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-bold text-foreground">Rp {pkg.price.toLocaleString("id-ID")}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Durasi: <strong className="text-foreground">{pkg.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Kecepatan: <strong className="text-foreground">{pkg.speed}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <span>Perangkat: <strong className="text-foreground">{pkg.devices} Device</strong></span>
                  </div>
                  
                  {selectedPkg === pkg.id && (
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 bg-primary text-white rounded-full p-1"
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-md mx-auto mt-12"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Lengkapi Data</CardTitle>
              <CardDescription>Masukkan nomor WhatsApp untuk menerima kode voucher.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePurchase} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor WhatsApp</Label>
                  <Input 
                    id="phone" 
                    placeholder="0812xxxx" 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full font-bold text-lg h-12" 
                  size="lg"
                  disabled={!selectedPkg || !phone || isLoading}
                >
                  {isLoading ? "Memproses..." : "Bayar Sekarang"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
