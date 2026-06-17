import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CheckCircle2, ShoppingBag, ArrowLeft, Zap, Shield, RotateCcw, Award } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Благодарим Ви! | KINETIC" },
      { name: "description", content: "Вашата поръчка е приета успешно!" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  const [orderDetails, setOrderDetails] = useState<{ name: string; color: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = sessionStorage.getItem("orderName");
      const color = sessionStorage.getItem("orderColor");
      if (name) {
        setOrderDetails({ name, color: color || "" });
      }
    }
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0d0d0e] text-white font-sans antialiased selection:bg-[#FF0F6A] selection:text-white flex flex-col justify-between">
      {/* Header */}
      <header className="bg-[#0d0d0e]/95 border-b border-white/10 px-4 py-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F6A] to-[#00D8FF]"
          >
            KINETIC
          </Link>
          <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-mono tracking-widest">
            v1.1
          </span>
        </div>
        <Link
          to="/"
          className="text-xs font-bold text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>НАЧАЛО</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute w-[60%] h-[60%] bg-gradient-to-tr from-[#FF0F6A]/15 to-[#00D8FF]/15 rounded-full blur-3xl -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-xl w-full bg-[#121214] border border-white/10 rounded-3xl p-6 sm:p-12 text-center flex flex-col items-center gap-6 shadow-2xl">
          {/* Animated Success Badge */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 bg-[#00D8FF]/20 rounded-full animate-ping" />
            <div className="w-16 h-16 bg-[#00D8FF]/10 border border-[#00D8FF]/30 rounded-full flex items-center justify-center relative z-10">
              <CheckCircle2 className="w-8 h-8 text-[#00D8FF]" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black tracking-tight uppercase">ПОРЪЧКАТА Е ПРИЕТА!</h1>
            <p className="text-white/60 text-sm font-medium">
              Благодарим Ви за доверието. Вашата заявка за KINETIC очила се обработва с приоритет.
            </p>
          </div>

          {orderDetails ? (
            <div className="w-full bg-[#0d0d0e]/60 border border-white/5 rounded-2xl p-5 text-left flex flex-col gap-3">
              <div className="text-[10px] font-black tracking-widest uppercase text-white/40 border-b border-white/5 pb-2">
                Детайли за поръчката
              </div>
              <div className="text-xs font-semibold flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-white/60">Клиент:</span>
                <span className="text-white font-bold sm:text-right">{orderDetails.name}</span>
              </div>
              <div className="text-xs font-semibold flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-white/60">Продукт:</span>
                <span className="text-white font-bold sm:text-right">
                  KINETIC S-Series ({orderDetails.color})
                </span>
              </div>
              <div className="text-xs font-semibold flex justify-between">
                <span className="text-white/60">Сума:</span>
                <span className="text-[#FF0F6A] font-black text-sm">17.90 €</span>
              </div>
            </div>
          ) : (
            <div className="w-full bg-[#0d0d0e]/60 border border-white/5 rounded-2xl p-5 text-left flex flex-col gap-3">
              <div className="text-[10px] font-black tracking-widest uppercase text-white/40 border-b border-white/5 pb-2">
                Детайли за поръчката
              </div>
              <div className="text-xs font-semibold flex justify-between">
                <span className="text-white/60">Продукт:</span>
                <span className="text-white font-bold">KINETIC S-Series</span>
              </div>
              <div className="text-xs font-semibold flex justify-between">
                <span className="text-white/60">Сума:</span>
                <span className="text-[#FF0F6A] font-black text-sm">17.90 €</span>
              </div>
            </div>
          )}

          <p className="text-xs text-white/70 max-w-sm leading-relaxed font-semibold">
            Наш сътрудник ще се свърже с Вас на посочения телефонен номер в рамките на деня за
            потвърждение на детайлите преди изпращане с Еконт / Спиди.
          </p>

          <Link
            to="/"
            className="w-full bg-gradient-to-r from-[#FF0F6A] to-[#8000FF] hover:from-[#ff2a7f] hover:to-[#9622ff] transition-all duration-300 py-4 rounded-xl font-black text-xs tracking-widest uppercase shadow-lg shadow-[#FF0F6A]/20 active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ОБРАТНО КЪМ МАГАЗИНА</span>
          </Link>
        </div>
      </main>

      {/* Footer Info section */}
      <section className="bg-[#121214] border-t border-white/10 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FF0F6A]" />
            <span className="text-xs font-bold uppercase tracking-wider">Експресна Доставка</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#00D8FF]" />
            <span className="text-xs font-bold uppercase tracking-wider">Преглед и Тест</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#8000FF]" />
            <span className="text-xs font-bold uppercase tracking-wider">
              14 Дни Право на Връщане
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080809] border-t border-white/5 py-8 px-4 text-center text-[10px] text-white/40 flex flex-col items-center gap-2">
        <p className="font-medium">
          © 2026 KINETIC Bulgaria. Всички права запазени. Оторизиран дистрибутор за България.
        </p>
      </footer>
    </div>
  );
}
