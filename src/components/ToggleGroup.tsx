import { cn } from '@/lib/utils';

const ToggleGroup = ({
  options,
  value,
  onChange,
  small,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  small?: boolean;
}) => (
  <div
    role='group'
    className={cn('flex gap-1 rounded-[10px] border border-white/10 bg-black/25 p-1', small && 'h-11.5')}
  >
    {options.map(opt => (
      <button
        key={opt.value}
        type='button'
        onClick={() => onChange(opt.value)}
        className={cn(
          'flex-1 cursor-pointer rounded border-0 font-mono text-sm font-medium',
          'transition-all duration-200',
          small ? 'flex items-center justify-center' : 'py-2.5',
          value === opt.value
            ? 'text-primary-foreground bg-[#b14195] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
            : 'text-foreground hover:text-foreground bg-transparent'
        )}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

export { ToggleGroup };
