import React from "react";
import ReactDOM from "react-dom";

import { AppContainer } from 'react-hot-loader';

ReactDOM.render(
   <AppContainer>
  	<h1>Hello world!</h1>
   </AppContainer>,
  document.getElementById("root")
);	

if(module.hot){
  module.hot.accept()
}