import React from 'react';
import './Legend.css';

function Legend(props) {
  const {types} = props;

  return <div className="Legend">
    <div className="types">
      {types.map((entry, i) => {
        const [k, v] = entry;
        return (<div key={k} className="item">
          <div className="type">
            <div className={`icon bg-${i}`}/>
            <div>{k}:</div>
          </div>
          <div className="count">{v} time{v !== 1 ? 's' : ''}</div>
        </div>);
      })}
    </div>
  </div>
}

export default Legend;
