import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Spinner from './Spinner';
import CircularProgress from '@material-ui/core/CircularProgress';

configure({adapter: new Adapter()});

describe('<Spinner />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Spinner />);
    });

    it('should contain CircularProgress', () => {
        wrapper.setProps({loading: true});
        expect(wrapper.contains(<CircularProgress />)).toEqual(true);
    });

});