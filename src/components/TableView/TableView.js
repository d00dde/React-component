import React from 'react';
import source from '../../source.js'

import './TableView.css';

function mapDate (day) {
	return {
		dayOfWeek: day.slice(0, 3),
		day: day.slice(3, 5),
		month: day.slice(5, 7),
		year: day.slice(7, 9),
	}
}

function sortSource (source) {
	const dates = [];
	const sorted = [];
	source.forEach((game) => {
		if(!dates.includes(game.day))
			dates.push(game.day);
	});
	dates.forEach((day) => {
		sorted.push({
			date: mapDate(day),
			games: source.filter((game) => game.day === day)
		})
	});
	return sorted;
}

const DayResults = ({dayResults}) => {
	const games = dayResults.games.map(({team1, team2, count}) => {
		const t1cls = [];
		const t2cls = [];
		const score1 = +count[0];
		const score2 = +count[2];
		if(score1 > score2){
			t1cls.push('winner');
			t2cls.push('looser');
		} else if (score1 < score2) {
			t1cls.push('looser');
			t2cls.push('winner');
		} else {
			t1cls.push('draw');
			t2cls.push('draw');
		}

		return (<li key={team1+team2}>
							<span className={t1cls.join(' ')}>{team1}</span>
							{" VS "}
							<span className={t2cls.join(' ')}>{team1}</span>
							<span> {count}</span>
						</li>);
	});
	return(
		<div className='day-results'>
			<h3>{dayResults.date.day}/{dayResults.date.month}/{dayResults.date.year}</h3>
			<ul className='games'>
				{games}
			</ul>
			<hr/>
		</div>
	)
}

const App = () => {
	const sorted = sortSource(source);
	const days = sorted.map((dayResults) => 
		<DayResults 
			key ={dayResults.games[0].day} 
			dayResults={dayResults} 
		/>);
  return (
      <div>
      	{days}
      </div>
  );
};

export default App;
