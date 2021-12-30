import * as React from 'react';
import styled from 'styled-components';
import { CityRow } from './components/CityRow';
import { localNewYearTime } from './utils';

export const App: React.FC = () => {
	return (
		<>
			<Header>{`🎉 ${new Date(localNewYearTime).getFullYear()} is coming 🎉`}</Header>
			<CityRow city="moscow" />
			<CityRow city="london, gb" />
			<CityRow city="tallinn" />
			<CityRow city="barnaul" />
		</>
	);
};

const Header = styled.h1`
	text-align: center;
	font-size: 40px;
	font-family: 'Roboto', sans-serif;
`;
