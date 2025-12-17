import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wifi, ShoppingCart, User, Smartphone, Clock, Zap, Check } from "lucide-react";
import { PACKAGES, createTransaction } from "@/lib/mock-api";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Portal() {
  const [activeTab, setActiveTab] = useState("login");
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      <div className="max-w-md mx-auto pb-20">
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-12 bg-muted/50 p-1">
            <TabsTrigger value="login" className="text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <User className="w-4 h-4 mr-2" />
              Masuk
            </TabsTrigger>
            <TabsTrigger value="buy" className="text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Beli Voucher
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="login" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur shadow-xl">
                  <CardContent className="pt-6 space-y-6">
                    <div className="text-center space-y-2">
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Wifi className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold font-display">Login Hotspot</h2>
                      <p className="text-muted-foreground text-sm">Masukkan kode voucher atau username</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Kode Voucher</Label>
                        <Input 
                          placeholder="Masukkan Kode Voucher" 
                          className="h-12 bg-background/50 text-lg text-center tracking-widest font-mono font-bold uppercase"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-3 text-sm text-center border border-dashed border-border">
                        <p className="text-muted-foreground mb-1">Belum punya kode voucher?</p>
                        <p className="font-medium text-primary cursor-pointer hover:underline" onClick={() => setActiveTab("buy")}>
                          Beli disini via E-Wallet (DANA, OVO, dll)
                        </p>
                      </div>

                      <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isLoading}>
                        {isLoading ? "Memproses..." : "MASUK INTERNET"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="buy" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {PACKAGES.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkg(pkg.id)}
                      className={`
                        relative overflow-hidden rounded-xl border-2 p-4 transition-all cursor-pointer
                        ${selectedPkg === pkg.id 
                          ? "border-primary bg-primary/5 shadow-md" 
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
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Clock className="w-3 h-3" /> {pkg.duration}
                            <span className="text-border">|</span>
                            <Zap className="w-3 h-3" /> {pkg.speed}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="block font-bold text-xl text-primary">
                            {pkg.price.toLocaleString("id-ID", { style: 'currency', currency: 'IDR' }).split(',')[0]}
                          </span>
                        </div>
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

                <Card className="border-border/50 bg-card/50 backdrop-blur sticky bottom-4 shadow-xl border-t">
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
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </Layout>
  );
}
