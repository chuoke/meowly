"use client";

import dynamic from 'next/dynamic';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const AdBlockerPopup = dynamic(() => import("@/components/AdBlockerPopup"), { ssr: false });
const PwaRegister = dynamic(() => import("@/components/PwaRegister"), { ssr: false });
const DomainRedirectPopup = dynamic(() => import("@/components/DomainRedirectPopup"), { ssr: false });
const FlyingParticles = dynamic(() => import("@/components/FlyingParticles"), { ssr: false });

const ShortcutsHUD = dynamic(() => import("@/components/ShortcutsHUD"), { ssr: false });

export default function ClientOnlyComponents() {
  const pathname = usePathname();

  useEffect(() => {
    // Remove existing script if present to ensure reload on route navigation
    const existingScript = document.getElementById('ad-network-script');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'ad-network-script';
    script.setAttribute('data-cfasync', 'false');
    script.async = true;
    script.type = 'text/javascript';
    script.src = '//fi.chaufergabelle.com/rnoAntQzBel2t/151988';

    document.head.appendChild(script);
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
