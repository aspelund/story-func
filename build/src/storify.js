import { checkDiff } from "./checkDiff";
import { PipeTypes } from "./types";
const storify = () => {
    const stories = [];
    const selectors = [];
    const checkStories = () => {
        const hasNonStory = stories.some((story) => story.pipeType !== PipeTypes.story);
        if (hasNonStory && selectors.length === 0) {
            throw new Error("Any transformation needs a selector");
        }
    };
    const myStory = {
        pipeType: PipeTypes.story,
        story: (given) => {
            stories.push(given);
            return myStory;
        },
        setMutableProperty: (selector) => {
            selectors.push(selector);
            return myStory;
        },
        apply: (obj) => {
            checkStories();
            const copy = JSON.parse(JSON.stringify(obj));
            const res = stories.reduce((prev, cur) => cur.apply(prev), copy);
            if (selectors.length === 0) {
                return res;
            }
            if (!checkDiff(selectors, obj, res)) {
                throw new Error("Changed property not meant for change " +
                    JSON.stringify(selectors) +
                    " <<<" +
                    JSON.stringify(obj) +
                    " <<<" +
                    JSON.stringify(res));
            }
            return res;
        },
    };
    return myStory;
};
export { storify };
