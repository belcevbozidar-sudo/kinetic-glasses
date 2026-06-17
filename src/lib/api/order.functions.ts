import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const sendTelegramOrder = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1),
      phone: z.string().min(1),
      office: z.string().min(1),
      color: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const token = "8803159850:AAGzf6itdnSjX9tFeNyUan2JEU0CRtIX8zA";
    const chatId = "8625026165";
    const text = `🔔 *Нова Поръчка!*\n\n👤 *Име:* ${data.name}\n📞 *Телефон:* ${data.phone}\n📍 *Адрес/Офис:* ${data.office}\n🕶️ *Цвят:* ${data.color}\n💶 *Сума:* 17.90 €`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      });

      if (!response.ok) {
        const errText = await response.clone().text();
        console.error("Telegram error response:", errText);
        return { success: false };
      }
      return { success: true };
    } catch (e) {
      console.error("Telegram send request failed:", e);
      return { success: false };
    }
  });
