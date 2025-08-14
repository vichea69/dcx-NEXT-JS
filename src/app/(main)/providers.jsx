'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'

const Providers = ({ children, session }) => {
    return (
        <SessionProvider session={session}>
            {children}
            <Toaster position="top-center" richColors />
        </SessionProvider>
    )
}

export default Providers


