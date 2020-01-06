import React from 'react';
import './App.css';
import Legend from './Legend';
import Main from './Main';
import data from './data/data';
import ByDay from './ByDay';
import ByMonth from './ByMonth';

const YEAR = 2019;
const WORDS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

function App() {
  // this can be done in data genertion phase but let's keep it here for now
  const sorted = Object.entries(data.types).sort((a, b) => b[1] - a[1]);
  const typeIds = sorted.reduce((acc, item, index) => {
    acc[item[0]] = index;
    return acc;
  }, {});
  const types = sorted.map(d => d[0]);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="title">
          {WORDS[Object.keys(data.types).length - 1]} Shades of Exercise in {YEAR}
        </div>
        <Legend types={sorted}/>
        <Main year={YEAR} data={data.data} typeIds={typeIds} />
        <ByDay data={data.by_day} types={types}/>
        <ByMonth data={data.by_month} types={types}/>
        <div className="Footer">
          Created by <a href="http://tany.kim" target="_blank" rel="noopener noreferrer">Tanyoung Kim</a>&nbsp;&nbsp;|&nbsp;&nbsp;View code on <a href="https://github.com/tanykim/shades-of-exercise" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </div>
  );
}

export default App;
