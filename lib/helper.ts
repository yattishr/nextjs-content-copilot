export function formatTimestamp(start_ms: number): string {
    const minutes = Math.floor(start_ms / 60000)
    const seconds = Math.floor((start_ms % 60000) / 1000)
    return `${minutes}: ${seconds.toString().padStart(2, "0")}`
}