'use client';

import { useEffect } from 'react';

const DARK_ICON_HREF = '/faviconDark.ico';
const LIGHT_ICON_HREF = '/faviconLight.ico';

function setFavicon(href: string) {
  const links = document.querySelectorAll("link[rel*='icon']");
  links.forEach((el) => el.parentNode?.removeChild(el));

  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = href.endsWith('.png') ? 'image/png' : 'image/x-icon';
  link.href = `${href}?v=${Date.now()}`;
  document.head.appendChild(link);
}

export default function FaviconSwitcher() {
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => setFavicon(mql.matches ? DARK_ICON_HREF : LIGHT_ICON_HREF);
    apply();
    mql.addEventListener('change', apply);
    return () => mql.removeEventListener('change', apply);
  }, []);

  return null;
}

