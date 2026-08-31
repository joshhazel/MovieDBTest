import { useState } from 'react';

export default function useLibrarySorting() {
  const [sort, setSort] = useState('title');

  return { sort, setSort };
}
