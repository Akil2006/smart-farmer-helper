import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectProps {
  id: string;
  label: string;
  helperText: string;
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const FormSelect = ({
  id,
  label,
  helperText,
  placeholder,
  options,
  value,
  onChange,
}: FormSelectProps) => {
  return (
    <div className="space-y-3">
      <Label
        htmlFor={id}
        className="text-farmer-lg text-foreground block"
      >
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-16 text-farmer-base px-5 rounded-xl border-2 border-border bg-background focus:border-leaf focus:ring-4 focus:ring-leaf/20">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-background border-2 border-border rounded-xl">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-farmer-base py-3 focus:bg-leaf-light"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-base text-muted-foreground">{helperText}</p>
    </div>
  );
};

export default FormSelect;
