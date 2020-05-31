import React from "react";
import {AppMode} from "./AppMode";
import {ReferenceBody} from "./ReferenceBody";
import {QuizBody} from "./QuizBody";

export const AppBody = ({appMode}) => {
  if (appMode === AppMode.REFERENCE_MODE) {
    return <ReferenceBody/>
  } else {
    return <QuizBody/>
  }
};