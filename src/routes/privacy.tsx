import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика за поверителност | KINETIC" },
      {
        name: "description",
        content: "Политика за поверителност на личните данни (Privacy Policy) на Kinetic",
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
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

        <div className="max-w-3xl w-full bg-[#121214] border border-white/10 rounded-3xl p-8 sm:p-12 text-left flex flex-col gap-6 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Shield className="w-8 h-8 text-[#00D8FF]" />
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
              ПОЛИТИКА ЗА ПОВЕРИТЕЛНОСТ
            </h1>
          </div>

          <div className="flex flex-col gap-4 text-sm text-white/80 leading-relaxed font-semibold">
            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                1. Обща информация
              </h2>
              <p>
                Ние зачитаме поверителността на вашите лични данни и се ангажираме да ги защитаваме
                в съответствие с Общия регламент за защита на данните (GDPR). Тази политика обяснява
                как събираме, използваме и съхраняваме личната информация, предоставена от вас при
                използването на този сайт и изпращането на поръчки.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                2. Какви лични данни събираме?
              </h2>
              <p>Когато попълните формата за поръчка на нашия сайт, ние събираме следните данни:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Име и Фамилия</li>
                <li>Телефонен номер за връзка и потвърждение</li>
                <li>Офис на куриер (Еконт или Спиди) за доставка</li>
              </ul>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                3. Цели на обработката на данните
              </h2>
              <p>Събраните данни се използват единствено и само за следните цели:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Обработка на вашата заявка за очила KINETIC</li>
                <li>Телефонно потвърждение на поръчката преди изпращане</li>
                <li>Доставка на стоката до посочения от вас офис на куриер</li>
              </ul>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                4. Споделяне на данни с трети страни
              </h2>
              <p>
                Ние споделяме предоставените от вас данни (име, телефон и адрес на офис) само и
                единствено с лицензирани куриерски оператори в България („Еконт Експрес“ ООД и
                „Спиди“ АД) с цел извършване на физическата доставка на поръчката. Вашите данни не
                се продават, споделят или разпространяват за други търговски или рекламни цели.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                5. Вашите права
              </h2>
              <p>
                Като субект на данните, вие имате право по всяко време да поискате достъп до вашите
                данни, тяхното коригиране или изтриване („правото да бъдете забравени“). За целта
                можете да се свържете с нас на телефона за потвърждение на поръчките.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#080809] border-t border-white/5 py-8 px-4 text-center text-[10px] text-white/40 flex flex-col items-center gap-2">
        <p className="font-medium">
          © 2026 KINETIC Bulgaria. Всички права запазени. Оторизиран дистрибутор за България.
        </p>
      </footer>
    </div>
  );
}
