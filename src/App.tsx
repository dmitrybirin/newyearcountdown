import * as React from 'react';
import styled from 'styled-components';
import { CityRow } from './components/CityRow';
import { localNewYearTime } from './utils';

export const App: React.FC = () => {
	return (
		<>
			<Header>{`🎉 ${new Date(localNewYearTime).getFullYear()} is coming 🎉`}</Header>
			<CityRow city="barnaul" />
			<CityRow city="st. petersburg, ru" />
			<CityRow city="vilnius" />
			<CityRow city="tallinn" />
			<CityRow city="berlin" />
			<CityRow city="london, gb" />
			<CityRow city="seattle" />
		</>
	);
};

const Header = styled.h1`
	text-align: center;
	font-size: 40px;
	font-family: 'Roboto', sans-serif;
`;
