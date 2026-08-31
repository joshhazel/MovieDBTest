import FilterSection from '../FilterSection';
import MultiChip from '../MultiChip';

export default function CountryFilter({ value, onChange }) {
  const countries = ['USA','UK','Canada','Japan','Korea'];

  return (
    <FilterSection title="Country">
      {countries.map(c => (
        <MultiChip
          key={c}
          active={value === c}
          onClick={() => onChange(c)}
        >
          {c}
        </MultiChip>
      ))}
    </FilterSection>
  );
}
