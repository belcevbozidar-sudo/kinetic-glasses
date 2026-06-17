import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Shield,
  Flame,
  Sparkles,
  Truck,
  RotateCcw,
  ShoppingBag,
  CheckCircle2,
  Zap,
  ChevronRight,
  Sliders,
  Eye,
  Maximize2,
  Heart,
  Star,
  Layers,
  Award,
  Coins,
} from "lucide-react";
import { sendTelegramOrder } from "../lib/api/order.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KINETIC | Спортни Очила от Бъдещето" },
      {
        name: "description",
        content:
          "Ултра леки спортни очила с иридиева леща. Създадени за колоездене, бягане, рейв партита и ежедневен стрийтуеър стил. Бърза доставка в България.",
      },
      { property: "og:title", content: "KINETIC | Спортни Очила от Бъдещето" },
      {
        property: "og:description",
        content:
          "Супер здрави и аеродинамични очила тип маска с иридиеви стъкла и 100% UV защита. Купи сега с експресна доставка за 24 часа!",
      },
      { property: "og:image", content: "/media/hero.webp" },
    ],
  }),
  component: Index,
});

const REVIEWS = [
  {
    name: "Мартин К.",
    rating: 5,
    date: "Преди 2 дни",
    text: "Очилата са брутални! Ползвам ги за колоездене и не мърдат от лицето благодарение на гумираните накрайници. Отражението на лещата е уникално на слънце.",
    tag: "Колоездене",
  },
  {
    name: "Десислава Г.",
    rating: 5,
    date: "Преди 5 дни",
    text: "Купих ги главно за фестивал и буквално всички ме питаха откъде са. Изключително леки, почти не ги усещам на лицето си. Розовият цвят е топ!",
    tag: "Рейв / Фестивали",
  },
  {
    name: "Александър П.",
    rating: 5,
    date: "Преди 1 седмица",
    text: "За бягане сутрин са перфектни. Лещата не се замаглява, а аеродинамичният дизайн спира вятъра отлично. Доставката дойде на следващия ден в офис на Еконт.",
    tag: "Бягане",
  },
];

const COLORS = [
  {
    id: "pink",
    name: "Vibrant Cyber Pink",
    code: "#FF0F6A",
    image: "/media/packshot_pink.jpg",
    status: "В наличност - Бърза доставка",
  },
  {
    id: "black",
    name: "Volt Ice Blue",
    code: "linear-gradient(135deg, #ffffff 50%, #00d8ff 50%)",
    image: "/media/packshot_white_blue.jpg",
    status: "В наличност - Ограничено количество",
  },
  {
    id: "cyan",
    name: "Acid Neon Green",
    code: "linear-gradient(135deg, #ffffff 50%, #10b981 50%)",
    image: "/media/packshot_white_green.jpg",
    status: "В наличност",
  },
];

function Index() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [cartCount, setCartCount] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [office, setOffice] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 7200));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleQuickOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !office) return;
    setLoading(true);
    try {
      await sendTelegramOrder({
        data: { name, phone, office, color: selectedColor.name },
      });
    } catch (err) {
      console.error("Telegram order sending failed:", err);
    }
    setTimeout(() => {
      setLoading(false);
      setOrderSuccess(true);
      setCartCount(1);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("orderName", name);
        sessionStorage.setItem("orderColor", selectedColor.name);
      }
      navigate({ to: "/thank-you" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white font-sans antialiased selection:bg-[#FF0F6A] selection:text-white">
      {/* Promo Bar */}
      <div className="bg-gradient-to-r from-[#FF0F6A] to-[#8000FF] py-2 px-4 text-center text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2">
        <Zap className="w-4 h-4 fill-white" />
        <span>ЕКСПРЕСНА ДОСТАВКА В БЪЛГАРИЯ ЗА 24 ЧАСА С ЕКОНТ / СПИДИ!</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0d0d0e]/95 backdrop-blur-md border-b border-white/10 px-4 py-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F6A] to-[#00D8FF]">
            KINETIC
          </span>
          <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-mono tracking-widest">
            v1.1
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wide text-white/80">
          <a href="#product" className="hover:text-white transition-colors">
            ПРОДУКТ
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            ХАРАКТЕРИСТИКИ
          </a>
          <a href="#reviews" className="hover:text-white transition-colors">
            ОТЗИВИ
          </a>
        </nav>
        <div>
          <a
            href="#product"
            className="bg-[#FF0F6A] hover:bg-[#ff2a7f] transition-all duration-300 px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-[#FF0F6A]/20 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>КУПИ СЕГА</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-[#FF0F6A]/10 border border-[#FF0F6A]/30 text-[#FF0F6A] px-3 py-1.5 rounded-full text-xs font-bold w-fit">
            <Flame className="w-3.5 h-3.5 fill-[#FF0F6A]" />
            <span>НАЙ-ЖЕЛАНИЯТ СПОРТЕН АКСЕСОАР ЗА СЕЗОНА</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none uppercase">
            ОЧИЛАТА ОТ <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F6A] via-[#8000FF] to-[#00D8FF]">
              БЪДЕЩЕТО
            </span>{" "}
            СА ТУК.
          </h1>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl font-medium">
            Ултра лека спортна конструкция с иридиева леща, проектирана да устои на вятър, прах и
            отблясъци. Съчетава аеродинамична прецизност за колоездене и бягане с безкомпромисна
            стрийтуеър визия за фестивали.
          </p>

          <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6 my-2">
            <div className="flex flex-col items-center text-center p-2 bg-white/5 rounded-lg border border-white/5">
              <img src="/media/weight.png" className="w-7 h-7 object-contain mb-1" alt="Тегло" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">
                Тегло
              </span>
              <span className="text-sm font-black mt-0.5">САМО 28g</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 bg-white/5 rounded-lg border border-white/5">
              <img
                src="/media/protection.png"
                className="w-7 h-7 object-contain mb-1"
                alt="Защита"
              />
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">
                Защита
              </span>
              <span className="text-sm font-black mt-0.5">UV400 КЛАС</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 bg-white/5 rounded-lg border border-white/5">
              <img src="/media/grip.png" className="w-7 h-7 object-contain mb-1" alt="Грип" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">
                Грип
              </span>
              <span className="text-sm font-black mt-0.5">НЕХЛЪЗГАЩ</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <a
              href="#product"
              className="w-full sm:w-auto bg-gradient-to-r from-[#FF0F6A] to-[#8000FF] hover:from-[#ff2a7f] hover:to-[#9622ff] transition-all duration-300 text-center px-8 py-4 rounded-full font-black text-sm tracking-widest uppercase shadow-lg shadow-[#FF0F6A]/20 active:scale-95"
            >
              ИЗБЕРИ СВОЯ ЦВЯТ
            </a>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white/60 uppercase">
                <Truck className="w-4 h-4 text-[#00D8FF]" />
                <span>Безплатна доставка за поръчки над 25 €</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-white/60 uppercase">
                <Coins className="w-4 h-4 text-[#FF0F6A]" />
                <span>Сигурна доставка с наложен платеж и преглед</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative flex items-center justify-center">
          {/* Main Visual Background Glow */}
          <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-[#FF0F6A]/20 to-[#00D8FF]/20 rounded-full blur-3xl -z-10 animate-pulse" />

          <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative group">
            <img
              src="/media/hero.webp"
              alt="Kinetic Sunglasses Hero Shot"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Tag Overlay */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF0F6A] animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider text-white/90">
                LIVE ACTION HERO SHOT
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-[#121214] border-y border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:flex md:flex-wrap md:justify-around items-center gap-6 text-left max-md:max-w-md max-md:mx-auto max-md:gap-y-6">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-[#FF0F6A]" />
            <div className="text-left">
              <h4 className="text-sm font-black uppercase tracking-wider">Експресна Доставка</h4>
              <p className="text-xs text-white/50 font-medium">24 часа с Еконт / Спиди</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="w-6 h-6 text-[#00D8FF]" />
            <div className="text-left">
              <h4 className="text-sm font-black uppercase tracking-wider">Преглед и Тест</h4>
              <p className="text-xs text-white/50 font-medium">Отвори и пробвай преди плащане</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#8000FF]" />
            <div className="text-left">
              <h4 className="text-sm font-black uppercase tracking-wider">100% Гаранция</h4>
              <p className="text-xs text-white/50 font-medium">Връщане без въпроси до 14 дни</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Coins className="w-6 h-6 text-yellow-500" />
            <div className="text-left">
              <h4 className="text-sm font-black uppercase tracking-wider">Наложен Платеж</h4>
              <p className="text-xs text-white/50 font-medium">Плащане при доставка с преглед</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Selection & Interactive Configurator */}
      <section id="product" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
            ИЗБЕРИ СВОЯТА{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F6A] to-[#8000FF]">
              ИДЕНТИЧНОСТ
            </span>
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl font-medium">
            Всички очила KINETIC пристигат с оригинален твърд спортен калъф, брандирана микрофибърна
            кърпа и стикер пакет.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Product Image Viewer */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-[#121214] relative flex items-center justify-center p-6 group">
              <img
                src={selectedColor.image}
                alt={selectedColor.name}
                className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#FF0F6A] text-xs font-black uppercase px-3 py-1 rounded-full">
                -40% НАМАЛЕНИЕ
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-widest text-white/70 uppercase">
                {selectedColor.status}
              </div>
            </div>

            {/* Thumbnail Previews / Angles */}
            <div className="grid grid-cols-3 gap-4">
              {COLORS.map((color) => (
                <div
                  key={color.id}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border bg-[#121214] p-3 flex items-center justify-center cursor-pointer hover:border-white/30 transition-colors ${
                    selectedColor.id === color.id ? "border-[#FF0F6A]" : "border-white/10"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <img
                    src={color.image}
                    alt={color.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Checkout & Direct Order Form */}
          <div className="lg:col-span-5 bg-[#121214] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 relative">
            {timeLeft > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 rounded-xl p-3 text-xs font-bold flex items-center justify-between">
                <span>Промоцията приключва след:</span>
                <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
              </div>
            )}

            <div>
              <h3 className="text-2xl font-black tracking-tight uppercase">KINETIC ACTIVE SPEED</h3>
              <p className="text-xs text-white/50 font-semibold tracking-wider mt-1">
                МОДЕЛ: S-SERIES 2026
              </p>
            </div>

            {/* Pricing block */}
            <div className="flex items-baseline gap-4 border-b border-white/10 pb-4">
              <span className="text-4xl font-black text-[#FF0F6A]">17.90 €</span>
              <span className="text-lg text-white/40 line-through">27.90 €</span>
              <span className="text-xs font-bold bg-[#FF0F6A]/10 text-[#FF0F6A] px-2.5 py-1 rounded-full uppercase">
                Спестяваш 10 €!
              </span>
            </div>

            {/* Color Swatch Picker */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-white/50">
                Избери Цвят на Рамката:
              </span>
              <div className="flex gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor.id === c.id ? "border-white scale-110" : "border-transparent hover:scale-105"}`}
                    style={{ background: c.code }}
                    title={c.name}
                  >
                    {selectedColor.id === c.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow shadow-black" />
                    )}
                  </button>
                ))}
              </div>
              <span className="text-xs font-semibold text-white/80">{selectedColor.name}</span>
            </div>

            {/* Direct Express Checkout Form */}
            {!orderSuccess ? (
              <form onSubmit={handleQuickOrder} className="flex flex-col gap-4 mt-2">
                <div className="text-xs font-black uppercase text-[#00D8FF] tracking-widest border-b border-[#00D8FF]/20 pb-2 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 fill-[#00D8FF]" />
                  <span>ЕКСПРЕСНА ПОРЪЧКА БЕЗ ПРЕПЛАЩАНЕ</span>
                </div>
                <p className="text-[11px] text-white/50 leading-tight font-medium">
                  Плащане на куриер (наложен платеж) след като отвориш кутията, прегледаш и пробваш
                  очилата на място!
                </p>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/60">
                    Име и Фамилия
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="напр. Иван Иванов"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#1d1d21] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0F6A] transition-colors font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/60">
                    Телефонен номер
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="напр. 08XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#1d1d21] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0F6A] transition-colors font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/60">
                    Офис на Еконт / Спиди (или точен адрес)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="напр. офис на Еконт - София Младост"
                    value={office}
                    onChange={(e) => setOffice(e.target.value)}
                    className="bg-[#1d1d21] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0F6A] transition-colors font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#FF0F6A] to-[#8000FF] hover:from-[#ff2a7f] hover:to-[#9622ff] disabled:opacity-50 transition-all duration-300 py-4 rounded-xl font-black text-sm tracking-widest uppercase shadow-lg shadow-[#FF0F6A]/20 active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ИЗПРАТИ ПОРЪЧКАТА</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-[#00D8FF]/10 border border-[#00D8FF]/30 rounded-xl p-6 text-center flex flex-col items-center gap-4 py-12 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#00D8FF] animate-bounce" />
                <h4 className="text-xl font-black uppercase tracking-tight text-[#00D8FF]">
                  Благодарим за поръчката!
                </h4>
                <p className="text-xs text-white/80 max-w-xs leading-relaxed font-semibold">
                  Успешно приехме поръчката на <span className="text-white font-bold">{name}</span>{" "}
                  за KINETIC S-Series в цвят{" "}
                  <span className="text-white font-bold">{selectedColor.name}</span>. Наш консултант
                  ще се свърже с Вас на посочения телефон за потвърждение преди изпращане.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Feature Accordion/Grid with Macro Image */}
      <section id="features" className="bg-[#121214] py-24 px-4 md:px-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Feature Column: Macro Image Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-white/10 relative group">
              <img
                src="/media/macro.jpg"
                alt="Kinetic Glasses Style Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                <Maximize2 className="w-3.5 h-3.5 text-[#00D8FF]" />
                <span className="text-xs font-mono font-bold tracking-wider text-white/90">
                  STYLE SHOWCASE
                </span>
              </div>
            </div>
          </div>

          {/* Right Feature Column: Content Grid */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FF0F6A]">
                ИНЖЕНЕРНА ПРЕЦИЗНОСТ
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-1">
                СЪЗДАДЕНИ ЗА ЕКСТРЕМНИ РЕЗУЛТАТИ
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 p-5 bg-[#0d0d0e] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                <Sliders className="w-6 h-6 text-[#FF0F6A]" />
                <h4 className="text-md font-black uppercase tracking-wider">Аеродинамична Форма</h4>
                <p className="text-xs text-white/60 leading-relaxed font-semibold">
                  Олекотена аеродинамична форма тип маска, която намалява съпротивлението на вятъра
                  и предпазва очите от странични прахови частици при бързи движения.
                </p>
              </div>

              <div className="flex flex-col gap-2 p-5 bg-[#0d0d0e] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                <Shield className="w-6 h-6 text-[#00D8FF]" />
                <h4 className="text-md font-black uppercase tracking-wider">
                  100% UV400 Иридиева Леща
                </h4>
                <p className="text-xs text-white/60 leading-relaxed font-semibold">
                  Специално поликарбонатно огледално покритие с иридиев спектър. Филтрира вредните
                  лъчи на 100% и осигурява кристално чиста видимост без напрежение.
                </p>
              </div>

              <div className="flex flex-col gap-2 p-5 bg-[#0d0d0e] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                <Sparkles className="w-6 h-6 text-[#8000FF]" />
                <h4 className="text-md font-black uppercase tracking-wider">Хидрофобно Покритие</h4>
                <p className="text-xs text-white/60 leading-relaxed font-semibold">
                  Лещите отблъскват вода и телесни мазнини, предпазвайки от замагляване и следи от
                  пръсти при интензивни кардио тренировки или лошо време.
                </p>
              </div>

              <div className="flex flex-col gap-2 p-5 bg-[#0d0d0e] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <h4 className="text-md font-black uppercase tracking-wider">
                  Неплъзгащ Грип на Носа
                </h4>
                <p className="text-xs text-white/60 leading-relaxed font-semibold">
                  Гумираната черна текстурирана вложка на носа предлага изключително сцепление,
                  което предотвратява приплъзване при изпотяване.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Customer Reviews */}
      <section id="reviews" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#00D8FF]">
            ОБЩЕСТВОТО НА KINETIC
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
            КАКВО КАЗВАТ НАШИТЕ КЛИЕНТИ
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl font-medium">
            Над 1,090+ активни спортисти и фестивални фенове в България вече избраха своята уникална
            S-Series идентичност.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="bg-[#121214] border border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col gap-4">
                {/* Stars and Category badge */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <span className="text-[10px] bg-[#FF0F6A]/10 text-[#FF0F6A] border border-[#FF0F6A]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono font-bold">
                    {review.tag}
                  </span>
                </div>
                <p className="text-sm text-white/80 italic leading-relaxed font-semibold">
                  "{review.text}"
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="text-xs font-black uppercase">{review.name}</span>
                <span className="text-[10px] text-white/40 font-mono">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Closer Footer Banner */}
      <section className="relative py-24 px-4 text-center overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#121214] to-[#0d0d0e]">
        <div className="absolute w-[60%] h-[60%] bg-gradient-to-tr from-[#FF0F6A]/10 to-[#8000FF]/10 rounded-full blur-3xl -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
            ВРЕМЕ Е ДА ИЗБЕРЕШ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D8FF] via-[#8000FF] to-[#FF0F6A]">
              ТВОЯТА НОВА СКОРОСТ
            </span>
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed font-medium">
            Поръчай в рамките на днешния ден и спести 40% от регулярната пазарна цена. Поръчките се
            изпращат веднага и са при теб утре!
          </p>
          <a
            href="#product"
            className="bg-gradient-to-r from-[#FF0F6A] via-[#8000FF] to-[#00D8FF] hover:opacity-95 transition-opacity px-10 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-xl shadow-[#FF0F6A]/20 active:scale-95 mt-4"
          >
            КУПИ KINETIC S-SERIES ЗА 17.90 €
          </a>
        </div>
      </section>

      {/* Sticky Bottom Bar for Mobile Only (Massive Conversion Booster) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0e]/90 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between lg:hidden">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
            KINETIC S-SERIES
          </span>
          <span className="text-md font-black text-[#FF0F6A]">17.90 €</span>
        </div>
        <a
          href="#product"
          className="bg-gradient-to-r from-[#FF0F6A] to-[#8000FF] px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase shadow-lg shadow-[#FF0F6A]/20 active:scale-95 flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>КУПИ СЕГА</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-[#080809] border-t border-white/5 py-12 px-4 md:px-8 text-center text-xs text-white/40 flex flex-col items-center gap-4 pb-20 lg:pb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-black tracking-tighter text-white">KINETIC</span>
          <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-white/40 font-mono tracking-widest">
            2026 EDITION
          </span>
        </div>
        <p className="max-w-md leading-relaxed font-medium">
          © 2026 KINETIC Bulgaria. Всички права запазени. Оторизиран дистрибутор за България.
          Доставките се извършват с Еконт и Спиди с право на преглед и тест.
        </p>
        <div className="flex flex-wrap gap-4 mt-2 justify-center">
          <a href="#product" className="hover:underline font-semibold">
            Условия за ползване
          </a>
          <span>•</span>
          <a href="#product" className="hover:underline font-semibold">
            Поверителност
          </a>
          <span>•</span>
          <a href="#product" className="hover:underline font-semibold">
            Контакти
          </a>
        </div>
      </footer>
    </div>
  );
}
