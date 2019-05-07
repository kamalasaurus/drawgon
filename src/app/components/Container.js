// Open Software License ("OSL") v 3.0
// Copyright (c) 2019 kamalasaurus

import m from '../../../node_modules/mithril/mithril.js';

// the container can be instantiated as a vnode m(Container, {n: '', c: []})
// or as a standard component Container(name, children) ... this is because
// mithril's mounting pattern is non-idempotent between vnodes and components
// Since I'm using a router which will have it's own root component for each
// route, and then containers inside said root -- maybe it would make sense to
// have a Root class that is independent of the Container just for root eleemnts?
export default function Container(_name = '', children = []) {
  return {
    view: ({attrs: { name }}) => m(
      `div.container.${name || _name}`,
      children
    )
  };
}

