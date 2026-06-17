import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Общи условия | KINETIC" },
      {
        name: "description",
        content: "Общи условия за ползване и покупка (Terms and Conditions) от Kinetic",
      },
    ],
  }),
  component: TermsAndConditions,
});

function TermsAndConditions() {
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
            <Award className="w-8 h-8 text-[#8000FF]" />
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
              ОБЩИ УСЛОВИЯ
            </h1>
          </div>

          <div className="flex flex-col gap-4 text-sm text-white/80 leading-relaxed font-semibold">
            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                1. Предмет
              </h2>
              <p>
                Настоящите Общи условия уреждат отношенията между доставчика на стоки (KINETIC
                Bulgaria) и потребителите на уебсайта във връзка с покупко-продажбата на спортни
                очила KINETIC чрез електронна заявка.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                2. Поръчки и телефонно потвърждение
              </h2>
              <p>
                Заявяването на продукт през сайта става чрез попълване на формата за поръчка (Име,
                Телефон и Офис за доставка). След изпращане на формата, нашата система регистрира
                заявката.
              </p>
              <p className="text-[#00D8FF]">
                ВАЖНО: Поръчката се счита за окончателно приета само след успешно телефонно обаждане
                от наш сътрудник за потвърждение на детайлите в рамките на същия работен ден. Ако не
                успеем да се свържем с вас по телефона, поръчката няма да бъде изпратена.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                3. Цени и начин на плащане
              </h2>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>
                  Крайната цена на очилата е указана на сайта в евро (€) или съответната левова
                  равностойност.
                </li>
                <li>
                  Плащането се извършва чрез <strong>Наложен Платеж</strong> (в брой или с карта на
                  ПОС терминал) в момента на получаване на пратката от куриера в избрания офис на
                  Еконт или Спиди.
                </li>
              </ul>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                4. Доставка, Преглед и Тест
              </h2>
              <p>
                Доставката се извършва до офис на Еконт или Спиди в рамките на 24 часа (до 1-2
                работни дни за по-малки населени места). Всички наши пратки се изпращат задължително
                с включена безплатна опция за <strong>Преглед и Тест</strong> преди плащане. Вие
                имате право да отворите пратката, да изпробвате очилата и да ги заплатите само ако
                ви харесват и ви стават.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-base font-black uppercase tracking-wide text-white">
                5. Право на връщане и рекламации
              </h2>
              <p>
                Съгласно Закона за защита на потребителите (ЗЗП), вие имате право да се откажете от
                покупката и да върнете закупената стока в срок от <strong>14 дни</strong> от датата
                на нейното получаване. Продуктът трябва да бъде върнат в оригиналния си вид,
                неизползван, без следи от употреба (надрасквания, зацапвания), в оригиналната си
                опаковка (калъф, кутия) и с всички прилежащи аксесоари (кърпичка, стикери).
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
