import { useEffect, useState } from 'react'

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Use capability-based detection instead of UA sniffing
        const query = window.matchMedia('(hover: none) and (pointer: coarse)')
        setIsMobile(query.matches)

        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
        query.addEventListener('change', handleChange)
        return () => query.removeEventListener('change', handleChange)
    }, [])

    return isMobile
}
