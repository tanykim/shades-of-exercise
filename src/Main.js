import React from 'react';
import './Main.css';

function Main(props) {
  const {year, data, typeIds} = props;

  const months = Array.from({length: 12}, (v, i) => {
    const firstDay = new Date(year, i, 1).getDay();
    const dateCount = new Date(year, i + 1, 0).getDate();
    // add days by week
    const weeks = [[]];
    // fill empty string till the first day when the first day is not Sunday
    const allDays = Array(firstDay).fill('').concat(
      ...Array.from({length: dateCount}, (v, i) => i + 1)
    );
    // add date into each week as an element of the array:weeks
    allDays.forEach(d => {
      const lastWeek = weeks[weeks.length - 1];
      if (lastWeek.length === 7) {
        weeks.push([]);
      }
      weeks[weeks.length - 1].push(d);
    })
    return {
      id: i + 1,
      name: new Date(year, i).toLocaleString('en-US', {month: 'long'}),
      dateCount: allDays.length,
      weeks,
    };
  });

  // get the largest day count including empty days from Sunday
  let dateCountMax = Math.max(...months.map(m => m.dateCount));
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
            {/* layout changes by week - a whole week goes to the next line when resized */}
            {month.weeks.map((week, i) => <div key={i} className="month-week">
              {week.map((day, j) => {
                const activities = data[month.id + '/' + day];
                // each day
                return (<div key={j} className="date">
                  {/* fill SVG background when there are activities,
                    assuming there are only upto 2 kinds of activities in one day */}
                  {activities != null && <>
                    {activities.map((a, i) => <div key={i} className={
                        `${day === '' ? 'blank' : 'solid'} fill-${typeIds[a.type]}`
                      }>
                      <svg viewBox="0 0 32 32" className={`fill${i === 1 ? '-half' : ''}`}>
                        <use xlinkHref={`#fill${i === 1 ? '-half' : ''}`}/>
                      </svg>
                    </div>)}
                  </>}
                  {day}
                </div>);
              })}
            </div>)}
          </td>
        </tr>)}
      </tbody>
    </table>
  );
}

export default Main;
