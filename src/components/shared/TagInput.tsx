import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}

export function TagInput({ tags, onChange, placeholder = "Type and press Enter" }: TagInputProps) {
  const [value, setValue] = useState("")

  const handleAddTag = () => {
    const nextTag = value.trim()
    if (!nextTag) {
      return
    }

    if (!tags.includes(nextTag)) {
      onChange([...tags, nextTag])
    }

    setValue("")
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return
    }

    event.preventDefault()
    handleAddTag()
  }

  return (
    <div className="space-y-2">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>
              {tag}
              <button
                type="button"
                aria-label={`Remove tag: ${tag}`}
                onClick={() => onChange(tags.filter((item) => item !== tag))}
                className="rounded-sm hover:bg-black/10"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
