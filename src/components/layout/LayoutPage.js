import React from 'react';
import Footer from '../Footer'

export const LayoutPage = ({ children }) => {
  return (
    <React.Fragment>
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default LayoutPage;
