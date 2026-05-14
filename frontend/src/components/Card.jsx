function Card({ title, children }) {
  return (
    <div className="card-shell">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default Card;
