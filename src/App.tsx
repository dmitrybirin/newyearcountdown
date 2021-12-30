import * as React from 'react';
import styled from 'styled-components';
import { CountDown } from './components/Countdown';
import { getCityInfo } from './utils';

const CityRow: React.FC<{ city: string }> = ({ city }) => {
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

export const App: React.FC = () => {
	return (
		<>
			<Header>new year is coming</Header>
			<CityRow city="tallinn" />
			<CityRow city="new york, us" />
			<CityRow city="moscow" />
			<CityRow city="barnaul" />
			<CityRow city="london" />
			<CityRow city="london, gb" />
		</>
	);
};

const Header = styled.h1`
	text-align: center;
	font-size: 40px;
	font-family: 'Roboto', sans-serif;
`;

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
