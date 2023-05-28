import { render, screen } from '@testing-library/react';
import Column from './Column';

describe('Column', () => {
	it('renders column test', () => {
		render(<Column start={1} end={2} />);
	});
});
