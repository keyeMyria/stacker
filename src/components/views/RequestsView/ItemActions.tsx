import { observer } from 'mobx-react'
import * as React from 'react'

import Button from 'material-ui/Button'

import { StatusName } from '../../../models/StatusChange'

interface Props {
	status: StatusName,
	deliver: () => void,
	complete: () => void
}

const ItemActions: React.SFC<Props> = (props) => {
	if (props.status === 'requested') {
		return(
			<Button
				variant="raised"
				color="primary"
				onClick={props.deliver}
			>
				Doručit
			</Button>
		)
	} else if (props.status === 'toReturn') {
		return(
			<Button
				variant="raised"
				color="secondary"
				onClick={props.complete}
			>
				Vrátit
			</Button>
		)
	} else {
		return null
	}
}

export default observer(ItemActions)
