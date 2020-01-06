import React from 'react';
import './Bars.css';

function Bars(props) {
  const {data, types, maxVal} = props;

  return <div className="Bars">
    {types.map((type, i) => {
      const w = 100 * data[type] / maxVal;
      return (<div key={type} className="row bar-wrapper">
        { w > 0 && <div className={`bar bg-${i}`} style={{width: w.toFixed(1) + '%'}}/>}
        <div className={`value${w > 90 ? ' inside': ''}`}>{data[type]}</div>
      </div>);
    })}
    <div className="row total">
      <span className="number">
        {Object.values(data).reduce((acc, num) => acc + num, 0)}
      </span>
    </div>
  </div>;
}

export default Bars;
