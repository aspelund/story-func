# story-func - Safe object transformation with declarative programming

Story-func is a simple library created to support developers to embrace a declarative programming paradigm. The principles that this library is meant to support are the following:

## Installation

    npm install story-func

In the code, simply import `storify` and `given`.

    import { storify, given } from 'story-fun';

Look at the example below to try it out.

## Principles

1. Clarity on how logic impacts object transformation
1. One logical test pipeline per property domain
1. Separation of logical tests and transformation
1. 100% testability of logical tests and transformation
1. No side effects allowed
1. All transformations of an object regarding a property domain should be in one file.

## Example

    const hasAge = (obj) => !!obj.age;
    const under18 = (obj) => obj.age < 18;
    const over18 = (obj) => obj.age >= 18;
    const setPharmacyFalse = (obj) => ({ ...obj, okForPharmacy: false });
    const setPharmacyTrue = (obj) => ({ ...obj, okForPharmacy: true });

    const applyPharmacy = storify()
        .story(
            storify()
                .setMutableProperty("okForPharmacy")
                .story(
                    given(hasAge)
                        .when(under18)
                        .then(setPharmacyFalse)
                )
                .story(
                    given(hasAge)
                        .when(over18)
                        .then(setPharmacyTrue)
                )
        )
        .story(
            storify()
                .setMutableProperty("pharmacyProductsRequiresPassword")
                ...
        )

    const person = { name: "James Stone", age: 19 };
    applyPharmacy.apply(input)

The library cosist of two methods, `storify` and `given`. Both are built to build pipelines of logic and transformations that gives no side effects and reduce boilerplate code.

`given` is following the given when then way of writing tasks. In the example above we see two examples of that. "Given a user that has age, when the user is younger than 18, he is not allowed to buy pharmaceutical products" and "Given a user that has age, when the user is older than 18, he is allowed to buy pharmaceutical products".
Each `given` can have multiple `when`. In those cases they all need to be fulfilled to make the `then` transform to happen.

`storify` is building an object transformation pipe utilizing the `story` function. `story` takes either a `given` as a property or another `storify`. Each storify can pipe multiple `given` and multiple `storify`.
In order to follow the principles stated above, a top level story would only contain stories that are focusing on specific domain properties, and each child story should focus on a single property that may or may not be changed. The `setMutableProperty` defines what properties that can be changed and is required in any `story` pipeline that contains a `given`. The property that may be changed by the pipeline is described as a selector. For example, if the `foo` object would be mutable in the pipeline and the object that the pipeline is applied to is `{foo:'bar'}` then the selector would be `foo`. If the property is deeper into the project the selector uses dots as separators. For the `bar` property to be mutable in the `{foo: { bar: 1 }}` object, the selector would be `foo.bar`.

Once the pipeline is created it can be applied to an object with the function `apply`. The object sent to `apply` is then sent through the pipeline. The original object is not changed and the returned value contains a copy of the original object but with any transformations that has been applied.

The stories should be defined in separation of IO logic so that each pipeline can be tested with full coverage.

## Thoughs

This little library was written more as an experiment and I would love to hear comments. Feel free to reach out to me with any thoughts or comments.
