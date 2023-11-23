import { useEffect } from "react";
import { useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secRemaining: null,
};

const SEC_PER_QUESTION = 30;

function reducer(state, action) {
  if (action.type === "dataReceived") {
    return { ...state, questions: action.payload, status: "ready" };
  }
  if (action.type === "dataFailed") {
    return { ...state, status: "error" };
  }
  if (action.type === "start") {
    return {
      ...state,
      status: "active",
      secRemaining: state.questions.length * SEC_PER_QUESTION,
    };
  }
  if (action.type === "newAnswer") {
    const question = state.questions[state.index];
    return {
      ...state,
      answer: action.payload,
      points:
        action.payload === question.correctOption
          ? state.points + question.points
          : state.points,
    };
  }
  if (action.type === "nextQuestion") {
    return { ...state, index: state.index + 1, answer: null };
  }
  if (action.type === "finished") {
    return {
      ...state,
      status: "finished",
      highscore:
        state.points > state.highscore ? state.points : state.highscore,
    };
  }
  if (action.type === "restart") {
    return {
      ...initState,
      questions: state.questions,
      status: "ready",
    };
  }
  if (action.type === "sec") {
    return {
      ...state,
      secRemaining: state.secRemaining - 1,
      status: state.secRemaining === 0 ? "finished" : state.status,
    };
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secRemaining },
    dispatch,
  ] = useReducer(reducer, initState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secRemaining={secRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
