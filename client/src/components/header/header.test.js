import React from 'react';
import {shallow, mount} from 'enzyme';

import Header from './index';

describe('<AddForm />', () => {
    it('Renders without crashing', () => {
        shallow(<Header />);
    });

    it('Renders the add button initially', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.hasClass('submit-task')).toEqual(true);
    });
    
});