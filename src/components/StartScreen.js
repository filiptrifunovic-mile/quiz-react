function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to React quiz</h2>
      <h3>{numQuestions} questions to test your react knowledge</h3>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Lets start
      </button>
    </div>
  );
}

export default StartScreen;
