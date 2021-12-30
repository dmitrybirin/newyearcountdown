import * as React from 'react';
import styled from 'styled-components';
import { getTimeToEvent } from '../utils';
import { CityInfo } from '../types';

const getTimeString = (offsetInMinutes: number) => {
	const { hh, mm, ss } = getTimeToEvent(offsetInMinutes);
	return `${hh}:${mm}:${ss}`;
};

export const CountDown: React.FC<{ cityInfo: CityInfo }> = ({ cityInfo }) => {
	const [timeString, setTimeString] = React.useState('');

	React.useEffect(() => {
		const timer = setInterval(
			() => setTimeString(getTimeString(cityInfo.relativeOffsetInMinutes)),
			1000
		);
		return () => clearInterval(timer);
	}, []);

	return <Timer>{timeString}</Timer>;
};

const Timer = styled.h1`
	font-size: 48px;
	font-weight: 900;
	font-family: 'Roboto', sans-serif;
`;
