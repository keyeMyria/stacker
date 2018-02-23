import { observer } from 'mobx-react'
import * as React from 'react'

import Button from 'material-ui/Button'

import { RequestStatus } from '../../../stores/interfaces/PalletRequest'

interface Props {
	status: RequestStatus,
	deliver: () => void,
	complete: () => void
}

const ItemActions: React.SFC<Props> = (props) => {
	if (props.status === 'requested') {
		return(
			<Button
				raised
				color="primary"
				onClick={props.deliver}
			>
				Doručit
			</Button>
		)
	} else if (props.status === 'toReturn') {
		return(
			<Button
				raised
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
