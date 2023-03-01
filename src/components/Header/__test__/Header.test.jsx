import { render } from '@testing-library/react';
import React from 'react';
import Header from '../index';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
