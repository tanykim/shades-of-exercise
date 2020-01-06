import React from 'react';
import Bars from './Bars';
import './ByDay.css';

const DAYS = 'Sunday/Monday/Tuesday/Wednesday/Thursday/Friday/Saturday'.split('/');

function ByDay(props) {
  const {data, types} = props;
  const maxVal = Math.max(...data.map(d => Math.max(...Object.values(d))));

  return <div className="ByDay">
    <div className="labels">
      {types.concat('Total').map(type =>
        <div key={type} className={`row label${type === 'Total' ? ' total' : ''}`}>
          <span className="text">{type}</span>
        </div>
      )}
    </div>
    <div className="days">
      {data.map((d, i) => <div key={i} className="day-wrapper">
        <div className="day-title">{DAYS[i]}</div>
        <Bars data={d} types={types} maxVal={maxVal}/>
      </div>)}
    </div>
  </div>
}

export default ByDay;
