import React, { ReactNode } from 'react';

const Authlayout = ({ children }: { children: ReactNode }) => {
  
  return <div className='flex pt-40 justify-center'>{children}</div>;
};

export default Authlayout;