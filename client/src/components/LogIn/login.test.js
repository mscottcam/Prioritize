import React from 'react';
import {shallow, mount} from 'enzyme';

import LogIn from './index';

xdescribe('<AddForm />', () => {
    it('Renders without crashing', () => {
        shallow(<LogIn />);
    });

    it('Renders the log in button', () => {
        const wrapper = shallow(<LogIn />);
        expect(wrapper.hasClass('submit-task')).toEqual(true); 
    });
    
});