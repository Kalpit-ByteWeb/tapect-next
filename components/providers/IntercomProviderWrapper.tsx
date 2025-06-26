'use client'

import { IntercomProvider, useIntercom } from 'react-use-intercom'
import { useEffect } from 'react'

const INTERCOM_APP_ID = 'f4qzs5kq'

export function IntercomBoot() {
  const { boot } = useIntercom()

  useEffect(() => {
    boot()
  }, [boot])

  return null
}

export default function IntercomProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <IntercomProvider appId={INTERCOM_APP_ID}>
      <IntercomBoot />
      {children}
    </IntercomProvider>
  )
}
