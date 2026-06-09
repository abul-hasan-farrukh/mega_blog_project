import React from 'react'


//container accepts properties as a children, it works like a box which contains styling properties like height and width
function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}

export default Container