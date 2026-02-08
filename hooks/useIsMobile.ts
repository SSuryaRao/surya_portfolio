import { useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js'

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const parser = new UAParser()
        const result = parser.getResult()
        setIsMobile(result.device.type === 'mobile' || result.device.type === 'tablet')
    }, [])

    return isMobile
}
