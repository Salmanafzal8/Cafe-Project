"use client"

import React from 'react'
import { store } from '../lib/store/index'
import { Provider } from 'react-redux';

export default  function Providers({children}: {children: React.ReactNode}) {
  return <Provider store={store}>
    {children}  
    </Provider>
}


