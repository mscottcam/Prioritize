import React from 'react';
import {shallow, mount} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import ReduxThunk from 'redux-thunk';
import redux from 'redux';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([ReduxThunk]);

import Tasks from './index';

describe('<Tasks />', () => {
  it('Renders without crashing', () => {
    const initialState= {
      taskReducer: [
        {
          userId: 12345,
          taskName: 'make initial tests for react components',
          deadline: 'today',
          important: true,
          urgent: true
        },
        {
          userId: 12345,
          taskName: 'make more tests for react components',
          deadline: 'today',
          important: true,
          urgent: true
        }
      ],
      authReducer: {
        currentUser: {
          _id: 12345
        }
      }
    }
        const component = shallow(<Tasks store={mockStore( initialState )}/>);
        expect(typeof component).toBe('object');
  });

  // xit('Renders the add task form initially', () => {
  //       const wrapper = shallow(<Tasks />);
  //       expect(wrapper.hasClass('submit-task')).toEqual(true);
  // });

	// it('Should switch to editing when the button is clicked', () => {
  //   const wrapper = shallow(<Tasks />);
  //   wrapper.simulate('click');
  //   expect(wrapper.state('editing')).toEqual(true);
	// });
	xit('Should fire the onAdd callback when the form is submitted', () => {
    const callback = jest.fn();
    const wrapper = mount(<Tasks onAdd={callback} />);
    const value = 'Foobar';
    wrapper.instance().setEditing(true);
    wrapper.find('input[type="text"]').node.value = value;
    wrapper.simulate('submit');
    expect(callback).toHaveBeenCalledWith(value);
	});
  xit('Should fire the onSubmit call back when submitted', () => {

  });
  xit('Should render all tasks to DOM upon login', () => {

	});
  xit('Should render no tasks when no currentUser ', () => {

	});
  xit('Should render edit form on click of task', () => {

	});

});