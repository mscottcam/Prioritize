import React from 'react';
import {shallow, mount} from 'enzyme';

import Header from './index';

xdescribe('<AddForm />', () => {
    it('Renders without crashing', () => {
        shallow(<Header />);
    });

});