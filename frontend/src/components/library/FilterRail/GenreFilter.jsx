import FilterSection from '../FilterSection';
import MultiChip from '../MultiChip';

export default function GenreFilter({ value, onChange }) {
  const genres = ['Action','Drama','Comedy','Sci-Fi','Horror','Romance'];

  return (
    <FilterSection title="Genre">
      {genres.map(g => (
        <MultiChip
          key={g}
          active={value === g}
          onClick={() => onChange(g)}
        >
          {g}
        </MultiChip>
      ))}
    </FilterSection>
  );
}
