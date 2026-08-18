import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title:
    "Политика конфиденциальности — Galina Chumak",
  description:
    "Информация об использовании аналитики и файлов cookie на сайте galinachumak.ru.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
