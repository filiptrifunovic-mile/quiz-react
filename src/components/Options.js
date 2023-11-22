function Options({ questions }) {
  return (
    <div className="options">
      {questions.options.map((item) => (
        <button key={item} className="btn btn-option">
          {item}
        </button>
      ))}
    </div>
  );
}

export default Options;
