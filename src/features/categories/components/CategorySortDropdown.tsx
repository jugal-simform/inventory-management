import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SORT_LABELS, type CategorySortOption } from "../hooks/useCategorySort"

interface CategorySortDropdownProps {
  value: CategorySortOption
  onSort: (value: CategorySortOption) => void
}

export function CategorySortDropdown({ value, onSort }: Readonly<CategorySortDropdownProps>) {
  return (
    <Select value={value} onValueChange={(v) => onSort(v as CategorySortOption)}>
      <SelectTrigger className="w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(SORT_LABELS) as CategorySortOption[]).map((key) => (
          <SelectItem key={key} value={key}>
            {SORT_LABELS[key]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
