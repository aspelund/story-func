enum PipeTypes {
  when,
  then,
  given,
  story,
}

type Test = (obj: any) => boolean;
type Transform = (obj: any) => any;

interface Given {
  when(test: Test): Given;
  then(test: Transform): Given;
  apply(obj: object): object;
  pipeType: PipeTypes;
}
type PipeObject = {
  pipeFunction: Test | Transform;
  pipeType: PipeTypes;
};

interface Storify {
  pipeType: PipeTypes;
  story(given: Storify | Given): Storify;
  setMutableProperty(selector: string): Storify;
  apply(obj: any): any;
}

export { PipeTypes, Test, Transform, Given, PipeObject, Storify };
