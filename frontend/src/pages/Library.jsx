import { useState } from 'react';

import LibraryLayout from '../components/library/LibraryLayout';
import LibraryToolbar from '../components/library/LibraryToolbar';
import Sidebar from '../components/library/Sidebar';
import PosterGrid from '../components/library/PosterGrid';

import useLibraryFilters from '../hooks/useLibraryFilters';
import useLibrarySorting from '../hooks/useLibrarySorting';

import data from '../data/mockLibrary';

export default function Library() {
  const { filters, setType, setStatus, setRating, setGenre, setCountry } =
    useLibraryFilters();
  const { sort, setSort } = useLibrarySorting();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'wall' | 'list'
  const [size, setSize] = useState(1); // 0.8–1.2 scale

  const filtered = data.filter(item => {
    if (filters.type && item.type !== filters.type) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.rating && item.rating !== filters.rating) return false;
    if (filters.genre && item.genre !== filters.genre) return false;
    if (filters.country && item.country !== filters.country) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'date') return b.id - a.id;
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'year') return b.year - a.year;
    if (sort === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <LibraryLayout>
      <LibraryToolbar
        sort={sort}
        onSortChange={setSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        size={size}
        onSizeChange={setSize}
      />

      <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
        <Sidebar
          filters={filters}
          setType={setType}
          setStatus={setStatus}
          setRating={setRating}
          setGenre={setGenre}
          setCountry={setCountry}
          sort={sort}
          onSortChange={setSort}
        />

        <PosterGrid items={sorted} viewMode={viewMode} size={size} />
      </div>
    </LibraryLayout>
  );
}
