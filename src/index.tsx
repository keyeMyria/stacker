import * as React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import AppStore from './stores/AppStore'

import 'typeface-roboto'

const store = new AppStore()

render(
  	<App store={store} />,
  	document.getElementById('root')
)