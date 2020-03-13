import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import List from './list';
import {ThemeContext, themes} from './theme-context';


export default props => {
      return (<ThemeContext.Provider value={ themes.dark } >
                <div className="layout">
                        <Button> Antd Button </Button>
                              Hello!!!
                              <List />
                  </div> 
             </ThemeContext.Provider> )
}