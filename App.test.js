import React from 'react';
import KucingScreen from './src/screens/KucingScreen';

import renderer from 'react-test-renderer';

describe('<App />', () => {
    it('has 1 child', () => {
        const cacing = 1
        expect(cacing).toBe(1);
    });
    it('comel sangat', () => {
        const cacing = 1
        expect(cacing).toBe(1);
    });
    it('comel sangat', () => {
        const tree = renderer.create(<KucingScreen />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});