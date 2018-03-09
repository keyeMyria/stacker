import * as React from 'react'

import List from 'material-ui/List'

import Request from '../../models/Request'

import RequestListItem from './RequestListItem'

interface Props {
	requests: Request[]
}

const RequestList: React.SFC<Props> = (props) => {
	const mapRequests = () => props.requests.map(r => (
		<RequestListItem key={r.id} request={r} />
	))

	return(
		<List disablePadding dense>
			{mapRequests()}
		</List>
	)
}

export default RequestList
