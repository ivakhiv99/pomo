export type FormState = {
    focusLength: number;
    shortBreakLength: number;
    longBreakLength: number;
};

export enum Stages {
    focus,
    shortBreak,
    longBreak,
  }