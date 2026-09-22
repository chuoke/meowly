"use client";

import dynamic from 'next/dynamic';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { adScriptUrls } from "@/lib/app-config";

const AdBlockerPopup = dynamic(() => import("@/components/AdBlockerPopup"), { ssr: false });
const PwaRegister = dynamic(() => import("@/components/PwaRegister"), { ssr: false });
const DomainRedirectPopup = dynamic(() => import("@/components/DomainRedirectPopup"), { ssr: false });
const FlyingParticles = dynamic(() => import("@/components/FlyingParticles"), { ssr: false });

const ShortcutsHUD = dynamic(() => import("@/components/ShortcutsHUD"), { ssr: false });

export default function ClientOnlyComponents() {
  const pathname = usePathname();

  useEffect(() => {
    const scriptIds = adScriptUrls.map((_, index) => `ad-network-script-${index}`);
    scriptIds.forEach(id => {
      const existing = document.getElementById(id);
      if (existing) existing.remove();
    });

    adScriptUrls.forEach((src, index) => {
      const script = document.createElement('script');
      script.id = scriptIds[index];
      script.setAttribute('data-cfasync', 'false');
      script.async = true;
      script.type = 'text/javascript';
      script.src = src;
      document.head.appendChild(script);
    });
  }, [pathname]);

  return (
    <>
      <AdBlockerPopup />
      <PwaRegister />
      <DomainRedirectPopup />
      <FlyingParticles />
      <ShortcutsHUD />
    </>
  );
}
