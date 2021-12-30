import * as React from 'react';
import styled from 'styled-components';
import { CountDown } from './Countdown';
import { getCityInfo } from '../utils';

export const CityRow: React.FC<{ city: string }> = ({ city }) => {
	const cityInfo = React.useMemo(() => getCityInfo(city), [city]);

	if (!cityInfo) {
		return null;
	}

	return cityInfo ? (
		<RowContainer>
			<CityName>{city}</CityName>
			<CountDown cityInfo={cityInfo} />
		</RowContainer>
	) : null;
};

const CityName = styled.h1`
	color: lightcoral;
	text-transform: uppercase;
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