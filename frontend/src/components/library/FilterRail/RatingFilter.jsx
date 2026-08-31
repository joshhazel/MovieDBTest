import FilterSection from '../FilterSection';
import MultiChip from '../MultiChip';

export default function RatingFilter({ value, onChange }) {
  const options = [1,2,3,4,5,6,7,8,9,10];

  return (
    <FilterSection title="Rating">
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
