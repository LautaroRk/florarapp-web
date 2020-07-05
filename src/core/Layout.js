import React from 'react';
import Menu from './Menu';

const Layout = ({title = 'Title', description = 'Description', className, children}) => (
  <React.Fragment>
    <Menu />
    <div className="bg-dark col pt-3 pb-1 pl-4 bl-1">
      <h5 className="text-light mr-3 mt-1 mb-1 w-100">{title}</h5>
      <p className="text-muted mt-1 w-100">{description}</p>
    </div>
    <div className={`${className} bg-light pt-4`}>
      {children}
    </div>
  </React.Fragment>
);

export default Layout;