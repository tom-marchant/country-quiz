import React from "react";
import {AppMode} from "./AppMode";
import {ReferenceBody} from "./ReferenceBody";
import {QuizBody} from "./QuizBody";

export const AppBody = ({appMode, gameType, setGameType}) => {
  if (appMode === AppMode.REFERENCE_MODE) {
    return <ReferenceBody/>
  } else if (appMode === AppMode.QUIZ) {
    return <QuizBody
        gameType={gameType}
        setGameType={setGameType}/>
  }
};