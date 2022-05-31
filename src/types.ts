export enum PipeTypes {
  when,
  then,
  given,
  story,
}

export type Test = <Type>(obj: Type) => boolean;
export type Transform = <Type>(obj: Type) => Type;

export interface Given {
  when(test: Test): Given;
  then(test: Transform): Given;
  apply<Type>(obj: Type): Type;
  pipeType: PipeTypes;
}
export type PipeObject = {
  pipeFunction: Test | Transform;
  pipeType: PipeTypes;
};

export interface Storify {
  pipeType: PipeTypes;
  story(given: Storify | Given): Storify;
  setMutableProperty(selector: string): Storify;
  apply<Type>(obj: Type): Type;
}
