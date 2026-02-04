import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  id: string;
  label: string;
  helperText: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
}

const FormInput = ({
  id,
  label,
  helperText,
  placeholder,
  type = "text",
  value,
  onChange,
  min,
  max,
  step,
}: FormInputProps) => {
  return (
    <div className="space-y-3">
      <Label
        htmlFor={id}
        className="text-farmer-lg text-foreground block"
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        className="h-16 text-farmer-base px-5 rounded-xl border-2 border-border bg-background focus:border-leaf focus:ring-4 focus:ring-leaf/20"
      />
      <p className="text-base text-muted-foreground">{helperText}</p>
    </div>
  );
};

export default FormInput;
