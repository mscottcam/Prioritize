import React from 'react';
import {shallow, mount} from 'enzyme';

import UserInfo from './index';

describe('<AddForm />', () => {
    it('Renders without crashing', () => {
        shallow(<UserInfo />);
    });

    it('Renders the add button initially', () => {
        const wrapper = shallow(<UserInfo />);
        expect(wrapper.hasClass('submit-task')).toEqual(true);
    });
});