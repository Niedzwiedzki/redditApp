import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SelectedPost from './SelectedPost';

configure({adapter: new Adapter()});

describe('<SelectedPost />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SelectedPost />);
    });

    it('should contain post', () => {
        wrapper.setProps({selected: true});
        expect(wrapper.find('.selectedPost')).toHaveLength(1);
    });

});