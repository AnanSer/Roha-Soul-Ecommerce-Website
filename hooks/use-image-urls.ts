import { useImageUrls as useImageUrlsContext } from "@/components/image-url-provider"

export function useImageUrls() {
  return useImageUrlsContext()
}
