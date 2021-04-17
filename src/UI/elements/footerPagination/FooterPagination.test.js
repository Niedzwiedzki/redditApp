import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FooterPagination from './FooterPagination';

configure({adapter: new Adapter()});

describe('<FooterPagination />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<FooterPagination />);
    });


    it('should have 1 disabled button (previous)', () => {
        wrapper.setProps({index:0 });
        expect(wrapper.find(".footerPagination__button--disabled")).toHaveLength(1);
    });

    it('should have 1 disabled button (next)', () => {
        wrapper.setProps({posts:7 });
        expect(wrapper.find(".footerPagination__button--disabled")).toHaveLength(1);
    });

    it('should have 2 disabled buttons', () => {
        wrapper.setProps({posts:7, index: 0});
        expect(wrapper.find(".footerPagination__button--disabled")).toHaveLength(2);
    });

    it('should have no disabled buttons', () => {
        wrapper.setProps({posts:10, index: 1});
        expect(wrapper.find(".footerPagination__button--disabled")).toHaveLength(0);
    });

});