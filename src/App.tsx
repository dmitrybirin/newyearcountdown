import styled from '@emotion/styled';
import * as React from 'react';

export const App: React.FC = () => {
	return <Header>Hello world!</Header>;
};

const Header = styled.h1`
	color: red;
`;
