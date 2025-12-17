import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Success() {
  const [location, setLocation] = useLocation();
  const [voucherData, setVoucherData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const data = localStorage.getItem("lastVoucher");
    if (!data) {
      setLocation("/checkout");
      return;
    }
    setVoucherData(JSON.parse(data));
  }, [setLocation]);

  const copyToClipboard = () => {
    if (voucherData?.voucher) {
      navigator.clipboard.writeText(voucherData.voucher);
      toast({
        title: "Disalin!",
        description: "Kode voucher berhasil disalin.",
      });
    }
  };

  if (!voucherData) return null;

  return (
    <Layout>
      <div className="max-w-md mx-auto pt-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-background shadow-2xl shadow-primary/10">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl text-primary">Pembayaran Berhasil!</CardTitle>
              <CardDescription>
                Terima kasih, berikut adalah kode voucher internet Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="bg-card border border-border rounded-xl p-6 text-center space-y-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Kode Voucher</p>
                <p className="text-4xl font-mono font-bold tracking-widest text-foreground select-all">
                  {voucherData.voucher}
                </p>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground text-center">
                <p>Paket: <span className="text-foreground font-medium">{voucherData.name || "Internet Package"}</span></p>
                <p>Nomor WA: <span className="text-foreground font-medium">{voucherData.phone}</span></p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full h-12" variant="outline" onClick={copyToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                Salin Kode
              </Button>
              <Button 
                className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20" 
                onClick={() => window.location.href = '/hotspot/login.html'}
              >
                <Wifi className="mr-2 h-5 w-5" />
                Login Hotspot
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
