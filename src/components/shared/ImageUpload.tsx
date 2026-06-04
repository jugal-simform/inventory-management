import { X } from "lucide-react"

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

function readFileAsDataUri(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result ?? ""))
    reader.onerror = () => reject(new Error("Unable to read image"))
    reader.readAsDataURL(file)
  })
}

export function ImageUpload({ images, onChange, maxImages = 5 }: ImageUploadProps) {
  const remainingSlots = Math.max(0, maxImages - images.length)

  const handleChange = async (files: FileList | null) => {
    if (!files || files.length === 0 || remainingSlots === 0) {
      return
    }

    const next = [...images]
    const selected = Array.from(files).filter((file) => file.type.startsWith("image/"))

    for (const file of selected.slice(0, remainingSlots)) {
      const dataUri = await readFileAsDataUri(file)
      next.push(dataUri)
    }

    onChange(next)
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor="product-images"
        className="block cursor-pointer rounded-md border border-dashed border-border p-3 text-center text-sm text-muted-foreground"
      >
        Click or drag to upload
      </label>
      <input
        id="product-images"
        type="file"
        accept="image/*"
        aria-label="Upload product images"
        className="sr-only"
        multiple
        onChange={(event) => {
          void handleChange(event.target.files)
          event.currentTarget.value = ""
        }}
      />
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {images.map((image) => (
            <div key={image} className="relative overflow-hidden rounded-md border border-border">
              <img src={image} alt="Uploaded preview" className="h-24 w-full object-cover" />
              <button
                type="button"
                aria-label="Remove image"
                onClick={() => onChange(images.filter((item) => item !== image))}
                className="absolute right-1 top-1 rounded-full bg-background/90 p-1"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
