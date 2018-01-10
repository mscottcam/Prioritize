import React from 'react';
import {shallow, mount} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Header from './index';
import UserInfo from '../userInfo'

describe('<Header />', () => {
  it('Renders without crashing', () => {
        shallow(<Header />);
	});
});
