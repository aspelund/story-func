import { PipeTypes } from "./types";
const given = (initialTest) => {
    const pipe = [];
    if (initialTest) {
        pipe.push({ pipeFunction: initialTest, pipeType: PipeTypes.when });
    }
    const myGiven = {
        pipeType: PipeTypes.given,
        when: (test) => {
            pipe.push({ pipeFunction: test, pipeType: PipeTypes.when });
            return myGiven;
        },
        then: (transform) => {
            pipe.push({ pipeFunction: transform, pipeType: PipeTypes.then });
            return myGiven;
        },
        apply: (obj) => {
            if (pipe.length === 0) {
                return obj;
            }
            if (pipe[0].pipeType === PipeTypes.when && !pipe[0].pipeFunction(obj)) {
                return obj;
            }
            const result = pipe.reduce((inputValue, pipeObject) => {
                if (pipeObject.pipeType === PipeTypes.when &&
                    !inputValue.isFulfilled) {
                    return inputValue;
                }
                if (pipeObject.pipeType === PipeTypes.when &&
                    inputValue.isFulfilled) {
                    const isFulfilled = pipeObject.pipeFunction(inputValue.data);
                    return {
                        ...inputValue,
                        isFulfilled,
                    };
                }
                if (inputValue.isFulfilled) {
                    return {
                        data: pipeObject.pipeFunction(inputValue.data),
                        isFulfilled: true,
                    };
                }
                return { ...inputValue, isFulfilled: true };
            }, { data: obj, isFulfilled: true });
            return result.data;
        },
    };
    return myGiven;
};
export { given };
