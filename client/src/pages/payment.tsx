import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { QRCodeSVG } from "qrcode.react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { checkPaymentStatus } from "@/lib/mock-api";
import { Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Payment() {
  const [location, setLocation] = useLocation();
  const [trxData, setTrxData] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const data = localStorage.getItem("currentTrx");
    if (!data) {
      setLocation("/checkout");
      return;
    }
    setTrxData(JSON.parse(data));
  }, [setLocation]);

  const handleCheckStatus = async () => {
    setIsChecking(true);
    try {
      const status = await checkPaymentStatus(trxData.reference);
      if (status.status === "PAID") {
        localStorage.setItem("lastVoucher", JSON.stringify({ ...trxData, ...status }));
        setLocation("/success");
      }
    } catch (error) {
      toast({
        title: "Belum dibayar",
        description: "Silakan selesaikan pembayaran terlebih dahulu.",
      });
    } finally {
      setIsChecking(false);
    }
  };

  if (!trxData) return null;

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold">Pembayaran</h1>
          <p className="text-muted-foreground">Scan QRIS di bawah ini untuk membayar</p>
        </div>

        <Card className="border-border shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardDescription>Total Pembayaran</CardDescription>
            <CardTitle className="text-4xl font-mono text-primary">
              Rp {trxData.amount.toLocaleString("id-ID")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6 pt-6">
            <div className="bg-white p-4 rounded-xl shadow-inner">
              <QRCodeSVG value={trxData.qr_url} size={200} />
            </div>
            
            <div className="text-center space-y-2 text-sm text-muted-foreground w-full">
              <div className="flex justify-between border-b border-border pb-2">
                <span>Ref ID:</span>
                <span className="font-mono text-foreground">{trxData.reference}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Nomor WA:</span>
                <span className="text-foreground">{trxData.phone}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button 
              className="w-full h-12 text-lg" 
              onClick={handleCheckStatus}
              disabled={isChecking}
            >
              {isChecking ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
              {isChecking ? "Mengecek..." : "Saya Sudah Bayar"}
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setLocation("/checkout")}>
              Batalkan
            </Button>
          </CardFooter>
        </Card>

        <div className="flex items-start gap-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm">
          <div className="mt-1">⚠️</div>
          <p>
            Voucher akan otomatis dikirim ke WhatsApp <strong>{trxData.phone}</strong> setelah pembayaran berhasil.
            Jangan tutup halaman ini sampai transaksi selesai.
          </p>
        </div>
      </div>
    </Layout>
  );
}
