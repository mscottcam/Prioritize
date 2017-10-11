import React from 'react';
import {shallow, mount} from 'enzyme';

import Tasks from './index';

xdescribe('<AddForm />', () => {
  it('Renders without crashing', () => {
        shallow(<Tasks />);
  });

  it('Renders the add button initially', () => {
        const wrapper = shallow(<Tasks />);
        expect(wrapper.hasClass('submit-task')).toEqual(true);
  });

	// it('Should switch to editing when the button is clicked', () => {
  //   const wrapper = shallow(<Tasks />);
  //   wrapper.simulate('click');
  //   expect(wrapper.state('editing')).toEqual(true);
	// });
	it('Should fire the onAdd callback when the form is submitted', () => {
    const callback = jest.fn();
    const wrapper = mount(<Tasks onAdd={callback} />);
    const value = 'Foobar';
    wrapper.instance().setEditing(true);
    wrapper.find('input[type="text"]').node.value = value;
    wrapper.simulate('submit');
    expect(callback).toHaveBeenCalledWith(value);
	});

});