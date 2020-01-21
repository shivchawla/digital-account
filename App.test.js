import React from 'react';
import KucingScreen from './src/screens/KucingScreen';
import LoanScreen from './src/screens/LoanScreen';

import renderer from 'react-test-renderer';

    it('comel sangat', () => {
        const tree = renderer.create(<KucingScreen />).toJSON();
        expect(tree.children.length).toBe(2);
    });

    it('comel sangat', () => {
        const tree = renderer.create(<KucingScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('comel sangat', () => {
        const tree = renderer.create(<LoanScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });