import * as React from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    
    const updateMatches = () => {
      setMatches(mediaQuery.matches)
    }
    
    // Set initial value
    updateMatches()
    
    // Add listener for changes
    mediaQuery.addEventListener("change", updateMatches)
    
    // Clean up on unmount
    return () => {
      mediaQuery.removeEventListener("change", updateMatches)
    }
  }, [query])

  return matches
}

export function useIsMobile() {
  const MOBILE_BREAKPOINT = 768
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
}
