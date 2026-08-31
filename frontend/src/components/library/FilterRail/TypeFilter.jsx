import FilterSection from '../FilterSection';
import MultiChip from '../MultiChip';

export default function TypeFilter({ value, onChange }) {
  const options = ['Movie', 'Show'];

  return (
    <FilterSection title="Type">
      {options.map(opt => (
        <MultiChip
          key={opt}
          active={value === opt}
          onClick={() => onChange(opt)}
        >
          {opt}
        </MultiChip>
      ))}
    </FilterSection>
  );
}
