import React from 'react';
import {shallow, mount} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import ReduxThunk from 'redux-thunk';
import redux from 'redux';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([ReduxThunk]);

import UserInfo from './index';

describe('<UserInfo />', () => {
	it('Renders without crashing', () => {
			const initialState = {
				authReducer: 
					{
						currentUser:{
						displayName: 'Evan Harris',
						googleId: '113991032114835833364',
						accessToken:
								'ya29.GlvVBK1WhImxQgRZGD9yanjRErwHcEmY6aQy2IFvzLli7WHPGW4Fv4iy2y1DwagsW9Qb8FEOJm_CfclLUAbRzocyina4RvRLrx5_92c-6A7A2_pXZZyg7ItY2e8Z',
						mission: 'have a live working usable app soon!',
						roles: [
							{
								role: 'Dad',
								goals: [
									{
										goal: 'Make delicious breakfast',
										tasks: [
											{
											taskName: 'test task',
											deadline: 'NOW',
											important: true,
											urgent: true
											}, 
											{
												taskName: 'test task2',
												deadline: 'NOW',
												important: false,
												urgent: true
											}
										]
										}
								]	
								}
						]
						}
					}
				}
			mount(<UserInfo store={mockStore( initialState )} />);
    });

    xit('Renders the add button initially', () => {
        const wrapper = shallow(<UserInfo />);
        expect(wrapper.hasClass('submit-task')).toEqual(true);
    });
});