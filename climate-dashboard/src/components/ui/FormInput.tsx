interface FormInputProps {
  label: string;
  name: string;
  register: any;
  error?: string;
  type?: string;
}

export default function FormInput({
  label,
  name,
  register,
  error,
  type = "text",
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>

      <input
        type={type}
        {...register(name)}
        aria-invalid={!!error}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
