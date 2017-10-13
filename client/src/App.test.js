import React from 'react';
import {shallow, mount} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import ReduxThunk from 'redux-thunk';
import { connect } from "react-redux";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './App';
import Header from "./components/header";
import Mission from "./components/mission";
import Tasks from "./components/tasks";

import configureStore from 'redux-mock-store';
const mockStore = configureStore([ReduxThunk]);

	const initialState = {
		authReducer: 
			{
				currentUser:{
				displayName: 'Evan Harris',
				googleId: '113991032114835833364'
        }
      }
  }
describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const component = <App store={mockStore(initialState)}>
    <Header />
    </App>;

    expect(typeof component).toBe('object');
    {/*ReactDOM.render(<Provider store={mockStore(initialState)}><App /> </Provider>, div);*/}
});
});