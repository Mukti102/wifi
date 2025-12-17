import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Wifi, ShoppingCart, User, Smartphone, Clock, Zap, Check } from "lucide-react";
import { PACKAGES, createTransaction } from "@/lib/mock-api";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Portal() {
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Berhasil",
        description: "Selamat datang di Fiberasinet!",
      });
    }, 1500);
  };

  const handlePurchase = async () => {
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
      localStorage.setItem("currentTrx", JSON.stringify({ ...trx, packageId: selectedPkg, phone }));
      setLocation(`/payment?ref=${trx.reference}`);
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto pb-20 space-y-8">
        
        {/* Login Section */}
        <Card className="border-border/50 bg-card/50 backdrop-blur shadow-xl">
          <CardContent className="pt-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold font-display">Login Hotspot</h2>
              <p className="text-muted-foreground text-sm">Masukkan kode voucher untuk akses internet</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder="MASUKKAN KODE VOUCHER" 
                  className="h-12 bg-background/50 text-lg text-center tracking-widest font-mono font-bold uppercase"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isLoading}>
                {isLoading ? "Memproses..." : "MASUK INTERNET"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Packages Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            <h3 className="text-xl font-bold font-display">Beli Paket Internet</h3>
          </div>

          <div className="space-y-4">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg.id)}
                className={`
                  relative overflow-hidden rounded-xl border-2 p-4 transition-all cursor-pointer
                  ${selectedPkg === pkg.id 
                    ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                    : "border-border bg-card/50 hover:bg-accent/5"
                  }
                `}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                    TERLARIS
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{pkg.name}</h3>
                    {pkg.id === "install" ? (
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Tersedia paket WiFi untuk keluarga mulai dari Rp 150.000 sebulan.
                        </p>
                        <p className="text-xs text-muted-foreground italic">
                          Klik tombol di bawah untuk pendaftaran via WhatsApp (Isi Nama & Alamat).
                        </p>
                        <Button 
                          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-10 mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = 'https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20berminat%20pasang%20WiFi%20rumahan.%20Mohon%20info%20lebih%20lanjut.';
                          }}
                        >
                          <Smartphone className="w-4 h-4 mr-2" />
                          Hubungi via WhatsApp
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" /> {pkg.duration}
                      </div>
                    )}
                  </div>
                  {pkg.id !== "install" && (
                    <div className="text-right">
                      <span className="block font-bold text-xl text-primary">
                        {pkg.price.toLocaleString("id-ID", { style: 'currency', currency: 'IDR' }).split(',')[0]}
                      </span>
                    </div>
                  )}
                  {pkg.id === "install" && (
                    <div className="text-right">
                       <span className="block font-bold text-lg text-primary">
                        Rp 150rb/bln
                      </span>
                    </div>
                  )}
                </div>
                
                {selectedPkg === pkg.id && (
                  <motion.div 
                    layoutId="check"
                    className="absolute bottom-2 right-2 text-primary"
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur shadow-xl border-t mt-6">
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label>Nomor WhatsApp (untuk kirim kode)</Label>
                <Input 
                  type="tel" 
                  placeholder="0812xxxx" 
                  className="h-12 bg-background/50"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button 
                className="w-full h-12 text-lg font-bold" 
                onClick={handlePurchase}
                disabled={!selectedPkg || !phone || isLoading}
              >
                {isLoading ? "Memproses..." : "BAYAR SEKARANG"}
              </Button>
            </CardContent>
          </Card>

          {/* Bantuan Admin Button */}
          <div className="pt-8 pb-4 text-center border-t border-border/50">
            <Button 
              variant="outline" 
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-6 h-auto text-base gap-2 shadow-lg hover:shadow-primary/20 transition-all"
              onClick={() => window.open('https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20butuh%20bantuan%20terkait%20Hotspot.', '_blank')}
            >
              <Smartphone className="w-5 h-5" />
              KLIK BANTUAN ADMIN
            </Button>
            <p className="text-[10px] text-muted-foreground mt-3 uppercase tracking-wider">
              Jika mengalami kendala login atau pembayaran
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
