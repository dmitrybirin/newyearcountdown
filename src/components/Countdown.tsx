import * as React from 'react';
import styled from 'styled-components';
import { getTimerToEvent } from '../utils';
import { CityInfo } from '../types';

export const CountDown: React.FC<{ cityInfo: CityInfo }> = ({ cityInfo }) => {
	const [timeString, setTimeString] = React.useState('');

	React.useEffect(() => {
		const timer = setInterval(() => {
			const { hh, mm, ss, stopped } = getTimerToEvent(cityInfo.targetCityNewYear);
			if (stopped) {
				setTimeString(`🎉🎄 ${hh}:${mm}:${ss}`);
				clearInterval(timer);
			} else {
				setTimeString(`${hh}:${mm}:${ss}`);
			}
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return <Timer>{timeString}</Timer>;
};

const Timer = styled.h1`
	font-size: 10vw;
	font-weight: 900;
	font-family: 'Roboto', sans-serif;
	@media (max-width: 768px) {
		font-size: 64px;
	}
`;
