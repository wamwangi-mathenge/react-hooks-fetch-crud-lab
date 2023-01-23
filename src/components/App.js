import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  // To Fetch All Questions
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    fetchQuestions(signal)
    return() => {
      controller.abort()
    }
  }, [])

  const fetchQuestions = (signal) => {
    fetch("http://localhost:4000/questions", {
      signal: signal,
    })
    .then((response) => response.json())
    .then((data) => {
      setQuestions(() => setQuestions(data))
    })
    .catch((error) => console.log(error))
  }


  // To Delete A Question
  const handleDeleteQuestion = (deletedQuestion) => {
    const filteredQuestions = questions.filter(
      (question) => question.id !== deletedQuestion.id
    )
    setQuestions(() => filteredQuestions)
  }


  // To Update a Question
  const handleChangeAnswer = (updatedQuestion) => {
    const updatedQuestions = questions.map((question) => {
      if(questions.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestions(() => updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm setQuestions={setQuestions} /> : 
      <QuestionList questions={questions} handleDeleteQuestion={handleDeleteQuestion} handleChangeAnswer={handleChangeAnswer} />}
    </main>
  );
}

export default App;
