import React from 'react';
import {shallow, mount} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import ReduxThunk from 'redux-thunk';
import redux from 'redux';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([ReduxThunk]);

import Mission from './index';

describe('<Mission />', () => {

	const initialState = {
		missionReducer: {
			currentUser: null,
			userId: null,
			currentMission: 'Do First Things First'
		},
		authReducer:
			{
				currentUser:{
				displayName: 'Evan Harris',
				googleId: '113991032114835833364',
				// accessToken:
				// 		'ya29.GlvVBK1WhImxQgRZGD9yanjRErwHcEmY6aQy2IFvzLli7WHPGW4Fv4iy2y1DwagsW9Qb8FEOJm_CfclLUAbRzocyina4RvRLrx5_92c-6A7A2_pXZZyg7ItY2e8Z',
				// mission: 'have a live working usable app soon!',
				// roles: [
				// 	{
				// 		role: 'Dad',
				// 		goals: [
				// 			{
				// 				goal: 'Make delicious breakfast',
				// 				tasks: [{
				// 					taskName: 'test task',
				// 					deadline: 'NOW',
				// 					important: true,
				// 					urgent: true
				// 				},
				// 				{
				// 					taskName: 'test task2',
				// 					deadline: 'NOW',
				// 					important: false,
				// 					urgent: true
				// 				}]
				// 			}
				// 		]
				// 		}
				// ]
			}
		}
	}
	it('Renders without crashing', () => {
			const component = mount(<Mission currentUser='' mission='Do First Things First' store={mockStore( initialState )} />);
			expect(typeof component).toBe('object');
			// expect string on DOM to equal prop.currentMission
			// console.log('Props ===>', component.props())
			expect(component.find('.current-mission').text()).toEqual('Do First Things First')

	});

	xit('Should dispatch fetch call when user is logged in', () => {
		// expect to dispatch fetch using the userID
		// expect to display button that says change mission
		// expect firstLoginComplete to Be true

	})
	xit('Should render Mission when user is logged in', () => {


	})
	it('Should show input field when user clicks on "change Mission" button', () => {
		const component = mount(
			<Mission
        currentUser={initialState.authReducer.currentUser}
				mission='Do First Things First'
				store={mockStore( initialState )}
   />);
		const updateMission = "Attend a black-tie event";


		// console.log('what gets rendered', component.html());

		expect(component.find('button').hasClass('change-mission')).toBeTruthy(); //==> failed
		component.find('.change-mission').simulate('click');
		expect(component.find('input')).toBeTruthy();
		expect(component.find('input')).toBeTruthy();
		component.find('.submit-mission').simulate('submit');
		expect(component.find('div').hasClass('change-mission-form')).toBeFalsy()

		// expect to have a submit new mission button
		// expect to call a Update Mission function called upon click of submit

	});
	xit('should update mission with new mission on submission of new mission', () => {
		const component = mount(<Mission currentUser='' mission='Do First Things First' store={mockStore( initialState )} />);

	})
	xit('', () => {

	})

	xit('Renders the add button initially', () => {
		const wrapper = shallow(<Mission store={mockStore( initialState )}  />);
		expect(wrapper.hasClass('submit-task')).toEqual(true);
	});
});
