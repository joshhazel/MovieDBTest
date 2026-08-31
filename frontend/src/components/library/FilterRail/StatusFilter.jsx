import FilterSection from '../FilterSection';
import MultiChip from '../MultiChip';

export default function StatusFilter({ value, onChange }) {
  const options = ['Released', 'Upcoming'];

  return (
    <FilterSection title="Status">
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
