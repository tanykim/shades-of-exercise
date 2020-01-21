import React, {useState} from 'react';
import './Main.css';

function Main(props) {
  const {year, data, typeIds} = props;

  const getDateCount = (i) => { return new Date(year, i + 1, 0).getDate(); }
  const months = Array.from({length: 12}, (v, i) => {
    const firstDay = new Date(year, i, 1).getDay();
    const dateCount = getDateCount(i);
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

  const getInactiveDays = (month, day, inactiveDays) => {
    const prevDay = day > 1 ?
      [month, day - 1]:
      (month > 1 ? [month - 1, getDateCount(month - 2)] : null);
    // if it's not January 1st
    if (prevDay != null) {
      const dateStr = prevDay.join('/');
      // when there's data in the previous day
      if (data[dateStr] != null) {
        return inactiveDays;
      } else {
        inactiveDays[dateStr] = true;
        // recursive when the date is inactive
        return getInactiveDays(...prevDay, inactiveDays);
      }
    } else {
      return inactiveDays;
    }
  }

  // tooltip content when an active day is hovered
  const [tooltip, setTooltip] = useState(null);
  // all previous inactive days when an inactive day is hovered
  const [inactiveDays, setInactiveDays] = useState({});

  const showDetail = (month, day) => {
    const dateStr = `${month}/${day}`;
    const activities = data[dateStr];
    if (activities != null) {
      const content = activities.map(a =>
        `<div class="tooltip-activity">
          <span class="tooltip-type bg-${typeIds[a.type]}">${a.type}</span>
          <span>${a.note}</span>
        </div>`
      );
      setTooltip({
        dateStr,
        content: {__html: content.join('')},
      });
      setInactiveDays({});
    } else if (day !== '') {
      setInactiveDays(getInactiveDays(month, day, {[dateStr]: true}));
      const count = Object.keys(inactiveDays).length;
      setTooltip({
        dateStr,
        content: {__html: `Inactive for ${count} day${count === 1 ? '' : 's'}`},
      });
    }
  };

  const hideDetail = () => {
    setTooltip(null);
  };

  return (<table className="Main">
    {/* day labels - Sun, Mon, Tue...*/}
    <thead>
      <tr className="row-day">
        <td/>
        <td className="week-label">
          {days.map((d, j) => <div key={j} className="day">{d}</div>)}
        </td>
      </tr>
    </thead>
    {/* all 365 days */}
    <tbody>
      {months.map((month, i) => <tr key={i} className="month">
        <td className="month-name">{month.name}</td>
        <td className="month-dates">
          {/* each month */}
          {month.allDays.map((day, i) => {
            const dateStr = `${month.id}/${day}`;
            const activities = data[dateStr];
            // when hovered show black bg & white text
            const isHover = tooltip != null && tooltip.dateStr === dateStr;
            return (<div key={i}
              className={`date${isHover ? ' black' : ''}${day !== '' ? ' valid' : ''}${activities != null ? ' with-data' : ''}`}
              onMouseOver={() => showDetail(month.id, day)}
              onMouseOut={() => hideDetail()}
              >
              {/* fill SVG background when there are activities,
                assuming there are only upto 2 kinds of activities in one day */}
              {activities != null && <>
                {activities.map((a, j) => <div key={j}
                  className={`active fill-${isHover ? 'black' : typeIds[a.type]}`}>
                  <svg viewBox="0 0 32 32" className={`fill${j === 1 ? '-half' : ''}`}>
                    <use xlinkHref={`#fill${j === 1 ? '-half' : ''}`}/>
                  </svg>
                </div>)}
              </>}
              {inactiveDays[dateStr] === true && <div className="inactive">
                <svg viewBox="0 0 24 24" className="fill">
                  <use xlinkHref="#inactive"/>
                </svg>
              </div>}
              <div>{day}</div>
              {isHover && <div className="tooltip">
                <div className="tooltip-content">
                  <div>{tooltip.dateStr}</div>
                  <div dangerouslySetInnerHTML={tooltip.content}/>
                </div>
                <div className="tooltip-arrow"/>
              </div>}
            </div>);
          })}
        </td>
      </tr>)}
    </tbody>
  </table>);
}

export default Main;
