import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import { useEffect } from "react";
import { useReducer } from "react";

const initState = {
  questions: [],
  //loading, error,ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  if (action.type === "dataReceived") {
    return { ...state, questions: action.payload, status: "ready" };
  }
  if (action.type === "dataFailed") {
    return { ...state, status: "error" };
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initState);

  const numQuestions = questions.length;

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
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  );
}

export default App;
