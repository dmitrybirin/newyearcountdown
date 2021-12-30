import * as React from 'react';
import styled from 'styled-components';

const getTimeToEvent = (target: string) => {
	const now = +new Date();
	const targetTimeMs = +new Date(target);

	const msLeft = targetTimeMs - now;
	const secondsLeft = Math.floor(msLeft / 1000);
	const minutesLeft = Math.floor(secondsLeft / 60);
	const hoursLeft = Math.floor(minutesLeft / 60);

	const hh = `${hoursLeft}`.padStart(2, '0');
	const mm = `${minutesLeft > 0 ? minutesLeft % 60 : 0}`.padStart(2, '0');
	const ss = `${secondsLeft > 0 ? secondsLeft % 60 : 0}`.padStart(2, '0');

	return { hh, mm, ss };
};

const getTimeString = (target: string) => {
	const { hh, mm, ss } = getTimeToEvent(target);
	return `${hh}:${mm}:${ss}`;
};

const tallinnTargetTime = 'January 1, 2022 00:00:00';

const CityRow: React.FC = () => {
	const [timeString, setTimeString] = React.useState('');

	React.useEffect(() => {
		const timer = setInterval(() => setTimeString(getTimeString(tallinnTargetTime)), 1000);
		return () => clearInterval(timer);
	}, []);
	return (
		<RowContainer>
			<CityName>TALLINN</CityName>
			<CountDown>{timeString}</CountDown>
		</RowContainer>
	);
};

export const App: React.FC = () => {
	return (
		<>
			<Header>new year is coming</Header>
			<CityRow />
		</>
	);
};

const Header = styled.h1`
	text-align: center;
	font-size: 40px;
	font-family: 'Roboto', sans-serif;
`;

const CountDown = styled.h1`
	font-size: 48px;
	font-weight: 900;
	font-family: 'Roboto', sans-serif;
`;

const CityName = styled.h1`
	color: lightcoral;
	font-size: 48px;
	font-weight: 900;
	font-family: 'Roboto', sans-serif;
`;

const RowContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
`;
