import React from 'react';
import {shallow, mount} from 'enzyme';

import Header from './index';

describe('<AddForm />', () => {
    it('Renders without crashing', () => {
        shallow(<Header />);
    });

});