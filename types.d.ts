export as namespace storyFunc;

export enum PipeTypes {
  when,
  then,
  given,
  story,
}

export type Test = (obj: any) => boolean;
export type Transform = <Type>(obj: Type) => Type;

export interface Given {
  when(test: Test): Given;
  then(test: Transform): Given;
  apply(obj: object): object;
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

export function given(initialTest?: Test): Given;
export function storify(): Storify;
