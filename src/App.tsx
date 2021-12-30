import * as React from 'react';
import styled from 'styled-components';
import { CityRow } from './components/CityRow';

export const App: React.FC = () => {
	return (
		<>
			<Header>new year is coming</Header>
			<CityRow city="moscow" />
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
