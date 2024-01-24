import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Maybe, Just, Nothing } from 'purify-ts/Maybe'
import { Either, Left, Right } from 'purify-ts/Either'

// Maybe
const getData = (params: { first: string; second?: string }) => Maybe.fromNullable(params.second)
  .chain(s => Just(`${params.first} ${s}`))
  .orDefault(params.first);

const dataWithoutSecond = getData({ first: 'First-NoSecond', second: undefined });
const dataWithSecond = getData({ first: 'First', second: 'With Second' });

const justExample = Just('Just Example');
const nothingExample = Nothing;
const fromFalsyExample = Maybe.fromFalsy('');
const fromPredicateExample = Maybe.fromPredicate((x: number) => x > 10, 15);
const catMaybesExample = Maybe.catMaybes([Just(1), Nothing, Just(3)]);
const mapMaybeExample = Maybe.mapMaybe((x: number) => x > 1 ? Just(x) : Nothing, [1, 2, 3]);

// Either
const parseJSON = (json: string): Either<Error, string> => {
  try {
    return Right(JSON.stringify(JSON.parse(json)));
  } catch (error) {
    console.log(error);
    return Left(Error('Invalid JSON'));
  }
};

const right = parseJSON('{"validJson": true}');
const left = parseJSON('invalid json');

const lefEncase = Either.encase(() => { throw Error('Just Failed')});
const rightEncase = Either.encase(() => JSON.stringify(JSON.parse('{"right": true}')));

const simpleRightExample = Right('Right Example').map(value => value.toUpperCase());
const simpleLeftExample = Left('Left Example').mapLeft(error => error.toLowerCase());
const chainExample = Right(5).chain(value => Right(value * 2));
const chainLeftExample = Left('Error').chainLeft(err => Left(err + ' Chain'));
const apExample = Right((x: number) => x * 2).ap(Right(x => x));
//Returns `this` if it's a `Left`, otherwise it returns the result of applying the function argument to `this` and wrapping it in a `Right`.
const extendExample = Left('Wrong Value').extend(e => e.isRight()); 


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Data without second: {dataWithoutSecond}</p>
        <p>Data with second: {dataWithSecond}</p>
        <p>Just Example: {justExample.orDefault('Nothing')}</p>
        <p>Nothing Example: {nothingExample.orDefault('Nothing')}</p>
        <p>fromFalsy Example: {fromFalsyExample.orDefault('Nothing')}</p>
        <p>fromPredicate Example: {fromPredicateExample.orDefault(15)}</p>
        <p>catMaybes Example: {catMaybesExample.join(', ')}</p>
        <p>mapMaybe Example: {mapMaybeExample.join(', ')}</p>

        <p>Right Example: {right.orDefault('Error')}</p>
        <p>Left Example: {left.orDefault('Error')}</p>
        <p>Right Encase Example: {rightEncase.isRight() == true ? String(rightEncase.extract()) : 'Left Encase' }</p>
        <p>Left Encase Example: {lefEncase.leftOrDefault(Error('Fail')).message}</p>
        <p>Simple Right Example: {String(simpleRightExample)}</p>
        <p>Simple Left Example: {String(simpleLeftExample)}</p>
        <p>Chain example: {String(chainExample)}</p>
        <p>Chain left example: {String(chainLeftExample)}</p>
        <p>Ap example: {String(apExample)}</p>
        <p>extend example: {String(extendExample)}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
