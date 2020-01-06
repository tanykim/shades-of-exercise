import React from 'react';
import './Main.css';

function Main(props) {
  const {year, data, typeIds} = props;

  const months = Array.from({length: 12}, (v, i) => {
    const firstDay = new Date(year, i, 1).getDay();
    const dateCount = new Date(year, i + 1, 0).getDate();
    // fill empty string till the first day when the first day is not Sunday
    const allDays = Array(firstDay).fill('').concat(
      ...Array.from({length: dateCount}, (v, i) => i + 1)
    );
    return {
      id: i + 1,
      name: new Date(year, i).toLocaleString('en-US', {month: 'long'}),
      allDays,
    };
  });

  // get the largest day count including empty days from Sunday
  let dateCountMax = Math.max(...months.map(m => m.allDays.length));
  // get day labels from Sunday to the day of the late date in the year
  const weekCount = Math.ceil(dateCountMax / 7);
  const days = 'Sun/Mon/Tue/Wed/Thu/Fri/Sat/'
    .repeat(weekCount)
    .split('/')
    .slice(0, 7 * weekCount - (7 - dateCountMax % 7));

  return (
    <table className="Main">
      {/* day labels - Sun, Mon, Tue...*/}
      <thead>
        <tr className="row-day">
          <td/>
          <td className="week-label">
            {days.map((d, j) => <div key={j} className="day">{d}</div>)}
          </td>
        </tr>
      </thead>
      <tbody>
        {months.map((month, i) => <tr key={i} className="month">
          <td className="month-name">{month.name}</td>
          <td className="month-dates">
            {month.allDays.map((day, i) => {
              const activities = data[month.id + '/' + day];
              return (<div key={i} className="date">
                {/* fill SVG background when there are activities,
                  assuming there are only upto 2 kinds of activities in one day */}
                {activities != null && <>
                  {activities.map((a, j) => <div key={j} className={
                      `${day === '' ? 'blank' : 'solid'} fill-${typeIds[a.type]}`
                    }>
                    <svg viewBox="0 0 32 32" className={`fill${j === 1 ? '-half' : ''}`}>
                      <use xlinkHref={`#fill${j === 1 ? '-half' : ''}`}/>
                    </svg>
                  </div>)}
                </>}
                {day}
              </div>);
            })}
          </td>
        </tr>)}
      </tbody>
    </table>
  );
}

export default Main;
