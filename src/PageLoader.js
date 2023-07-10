import React from 'react';

const PageLoader = () => {
  return (
    <div className="wrapper">
     <div className='loading'>
        <div className='spinner-section'>
            <i className='fa fa-spin fa-spinner'></i> Processing ...
        </div>
     </div>
    </div>
  );
};

export default PageLoader;