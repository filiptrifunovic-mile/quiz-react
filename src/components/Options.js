function Options({ questions, answer, dispatch }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {questions.options.map((item, index) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={item}
          disabled={hasAnswered}
          className={`btn btn-option ${index === answer ? "answer" : ""}
            ${
              hasAnswered
                ? questions.correctOption === index
                  ? "correct"
                  : "wrong"
                : ""
            }
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default Options;
