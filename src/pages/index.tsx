import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import questions from "@/data/questions.json";
import React, { useState } from "react";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };
  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  type SelectedOption = {
    answerByUser: string;
  };
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);

  const handleAnswerOption = (answer: string) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  //   Calculate score
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    setScore(newScore);
    setShowScore(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOptions([]);
  };

  return (
    <>
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="Quiz app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center">
        <div className="conatiner">
          {showScore ? (
            <>
              <h1 className="text-3xl font-semibold text-center text-white">
                You scored {score} out of {questions.length}
              </h1>
              <div className="flex justify-between w-full mt-4 text-white">
                <button
                  onClick={handleRestart}
                  className="w-full py-3 bg-indigo-600 rounded-lg"
                >
                  Restart
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Top */}
              <div className="flex flex-col items-start w-full">
                <h4 className="mt-10 text-xl text-white/60">
                  Question {currentQuestion + 1} of {questions.length}
                </h4>
                <div className="mt-4 text-2xl text-white">
                  {questions[currentQuestion].question}
                </div>
              </div>
              {/* </> Top */}

              {/* Questions */}
              <div className="flex flex-col w-full">
                {questions[currentQuestion].answerOptions.map(
                  (answer, index) => (
                    <div
                      key={index}
                      className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                      onClick={(e) => handleAnswerOption(answer.answer)}
                    >
                      <input
                        type="radio"
                        name={answer.answer}
                        value={answer.answer}
                        onChange={(e) => handleAnswerOption(answer.answer)}
                        checked={
                          answer.answer ===
                          selectedOptions[currentQuestion]?.answerByUser
                        }
                        className="w-6 h-6 bg-black"
                      />
                      <p className="ml-6 text-white">{answer.answer}</p>
                    </div>
                  )
                )}
              </div>
              {/* </> Questions */}

              {/* Buttons */}
              <div className="flex justify-between w-full mt-4 text-white">
                <button
                  onClick={handlePrevious}
                  className="w-[49%] py-3 bg-indigo-600 rounded-lg"
                >
                  Previous
                </button>
                <button
                  onClick={
                    currentQuestion + 1 === questions.length
                      ? handleSubmitButton
                      : handleNext
                  }
                  className="w-[49%] py-3 bg-indigo-600 rounded-lg"
                >
                  {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
                </button>
              </div>
              {/* </> Buttons */}
            </>
          )}
        </div>
      </main>
    </>
  );
}
