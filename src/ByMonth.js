import React from 'react';
import './ByMonth.css';

function ByMonth(props) {
  const {data, types} = props;

  // get Jan, Feb, Mar...
  const months = Array(12).fill(null).map((v, i) => {
    return new Date(2020, i).toLocaleString('en-US', {month: 'long'})
  });

  const totals = data.map(d => Object.values(d).reduce((acc, num) => acc + num, 0));
  const maxTotal = Math.max(...totals);

  return (
    <table className="ByMonth">
      <tbody>
        {months.map((m, i) => {
          const totalW = 100 * totals[i] / maxTotal;
          return (<tr key={m}>
            <td className="label">{m}</td>
            <td className="stacked">
              {types.map((type, j) => {
                // width of each type value
                const val = data[i][type];
                const w = 100 * val / maxTotal;
                if (w > 0) {
                  return <div key={j}
                    className={`stack bg-${j}`}
                    style={{width: w.toFixed(2) + '%'}}>
                    {val}
                  </div>;
                }
              })}
              <div className="total" style={{left: totalW.toFixed(2) + '%'}}>
                {totals[i]}
              </div>
            </td>
          </tr>);
        })}
      </tbody>
    </table>
  );
}
export default ByMonth;
