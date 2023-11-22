function NextButton({ dispatch, answer }) {
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

export default NextButton;
