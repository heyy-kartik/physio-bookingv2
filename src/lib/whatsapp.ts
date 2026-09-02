// Owner's WhatsApp number in international format, no + or spaces (e.g. "919876543210")
export const OWNER_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_OWNER_WHATSAPP_NUMBER || "919999999999";

export function buildWhatsAppLink(params: {
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}) {
  const lines = [
    `New appointment request`,
    ``,
    `Name: ${params.name}`,
    `Phone: ${params.phone}`,
    `Service: ${params.service}`,
    `Preferred date: ${params.preferredDate}`,
    `Preferred time: ${params.preferredTime}`,
  ];
  if (params.message) {
    lines.push(`Notes: ${params.message}`);
  }
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${text}`;
}
