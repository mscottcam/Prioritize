import React from 'react';
import {shallow, mount} from 'enzyme';

import Mission from './index';

describe('<AddForm />', () => {
    it('Renders without crashing', () => {
        shallow(<Mission />);
    });

    it('Renders the add button initially', () => {
        const wrapper = shallow(<Mission />);
        expect(wrapper.hasClass('submit-task')).toEqual(true);
    });
});