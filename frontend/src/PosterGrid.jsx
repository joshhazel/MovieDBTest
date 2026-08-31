import PosterCard from "./PosterCard.jsx";

export default function PosterGrid({ items, viewMode, size }) {
  let style;

  if (viewMode === "list") {
    style = {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      flex: 1,
    };
  } else if (viewMode === "poster") {
    style = {
      display: "flex",
      flexWrap: "wrap",
      gap: "32px",
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "12px",
    };
  } else {
    // GRID (default)
    style = {
      display: "flex",
      flexWrap: "wrap",
      gap: "24px",
      flex: 1,
      paddingTop: "12px",
    };
  }

  return (
    <div style={style}>
      {items.map((item) => (
        <PosterCard key={item.id} item={item} size={size} />
      ))}
    </div>
  );
}
