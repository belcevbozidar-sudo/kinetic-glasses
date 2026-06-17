import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Cookie, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Политика за бисквитки | KINETIC" },
      {
        name: "description",
        content: "Политика за използване на бисквитки (Cookies Policy) на Kinetic",
      },
    ],
  }),
  component: CookiesPolicy,
});

function CookiesPolicy() {
  const handleResetConsent = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cookie-consent");
      window.location.reload();
    }
  };

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
            <Cookie className="w-8 h-8 text-[#FF0F6A]" />
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
              ПОЛИТИКА ЗА БИСКВИТКИ
            </h1>
          </div>

          <div className="flex flex-col gap-4 text-sm text-white/80 leading-relaxed font-semibold">
            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                1. Какво представляват бисквитките?
              </h2>
              <p>
                Бисквитките (cookies) са малки текстови файлове, които се съхраняват на вашето
                устройство (компютър, таблет или мобилен телефон), когато посещавате даден уебсайт.
                Те помагат на сайта да разпознае вашето устройство и да запази информация за вашите
                предпочитания или минали действия.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                2. Какви бисквитки използваме?
              </h2>
              <p>На нашия уебсайт използваме два основни вида бисквитки:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>
                  <span className="text-[#00D8FF] font-bold">
                    Необходими и функционални бисквитки (собствени):
                  </span>{" "}
                  Използват се за съхраняване на технически данни, като например избрания от вас
                  цвят на очилата и името ви в рамките на сесията, за да завършите поръчката и да се
                  заредят данните на страницата за благодарност. Те се изтриват автоматично след
                  затваряне на браузъра.
                </li>
                <li>
                  <span className="text-[#FF0F6A] font-bold">
                    Маркетингови и аналитични бисквитки (Meta Pixel):
                  </span>{" "}
                  Тези бисквитки се зареждат само след вашето изрично съгласие („Разрешавам“). Те ни
                  позволяват да анализираме ефективността на нашите реклами и да проследяваме
                  реализациите (например поръчки и запитвания).
                </li>
              </ul>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                3. Управление и изтриване на бисквитките
              </h2>
              <p>
                Вие можете по всяко време да промените или оттеглите своето съгласие за използване
                на бисквитки от нашия сайт. Ако изберете да откажете маркетинговите бисквитки, Meta
                Pixel няма да събира данни за вашите действия на нашия сайт.
              </p>
              <p>
                Можете да използвате бутона по-долу, за да изтриете запазените настройки за съгласие
                в браузъра си и да изберете отново:
              </p>
              <button
                onClick={handleResetConsent}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-black text-xs uppercase tracking-widest py-3 px-6 rounded-xl transition-all cursor-pointer self-start active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Нулирай предпочитанията за бисквитки</span>
              </button>
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
