function NextButton({ dispatch, answer, index, numQuestions }) {
  if (index < numQuestions - 1) {
    return (
      answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          NEXT
        </button>
      )
    );
  }

  if (index === numQuestions - 1) {
    return (
      answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finished" })}
        >
          FINISH
        </button>
      )
    );
  }
}

export default NextButton;
