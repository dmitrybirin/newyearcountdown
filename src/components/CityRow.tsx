import * as React from 'react';
import styled from 'styled-components';
import { CountDown } from './Countdown';
import { getCityInfo } from '../utils';

export const CityRow: React.FC<{ city: string }> = ({ city }) => {
	const cityInfo = React.useMemo(() => getCityInfo(city), [city]);

	return cityInfo ? (
		<RowContainer>
			<CityName>{cityInfo.cityName}</CityName>
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
	padding: 0 30px;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	@media (max-width: 1024px) {
		flex-direction: column;
	}

	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		flex-direction: column;
	}
`;
