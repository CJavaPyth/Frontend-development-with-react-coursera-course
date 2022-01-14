import React from 'react';

export const Loading = () => {
    return ( //pulse makes it rotate, 3x the speed, fa forward spinning
      <div className='col-12'>
            <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary'></span>
            <p>Loading ...</p>    
      </div>  
    );
};