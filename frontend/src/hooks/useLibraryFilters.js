import { useState } from 'react';

export default function useLibraryFilters() {
  const [type, setType] = useState(null);
  const [status, setStatus] = useState(null);
  const [rating, setRating] = useState(null);
  const [genre, setGenre] = useState(null);
  const [country, setCountry] = useState(null);

  return {
    filters: { type, status, rating, genre, country },
    setType,
    setStatus,
    setRating,
    setGenre,
    setCountry
  };
}
