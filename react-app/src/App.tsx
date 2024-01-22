import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Maybe, Just, Nothing } from 'purify-ts/Maybe'

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
