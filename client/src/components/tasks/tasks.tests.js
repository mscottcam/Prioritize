import React from 'react';
import {shallow, mount} from 'enzyme';

import Tasks from './index';

describe('<AddForm />', () => {
    it('Renders without crashing', () => {
        shallow(<Tasks />);
    });

    it('Renders the add button initially', () => {
        const wrapper = shallow(<Tasks />);
        expect(wrapper.hasClass('submit-task')).toEqual(true);
    });
});