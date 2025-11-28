import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '@/components/SEO';
import { StarlinkMap } from '@/components/StarlinkMap';

export default function StarlinkMapPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title="Starlink Kapsama Haritası" 
        description="Dünya genelinde Starlink hizmetinin aktif olduğu ve geofenced bölgeleri gösteren detaylı kapsama haritası." 
      />
      <StarlinkMap fullScreen={true} />
    </>
  );
}
