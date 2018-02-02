import * as React from 'react'
import { observer } from 'mobx-react'
import * as classnames from 'classnames'

import { withStyles, WithStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import { grey } from 'material-ui/colors'

import RequestsStore from '../../../stores/RequestsStore'
import PalletRequest, { RequestStatus } from '../../../stores/interfaces/PalletRequest'
import RequestListItem from './RequestListItem'
import RequestListItemSummary from './RequestListItemSummary'
import Divider from 'material-ui/Divider/Divider';

interface Props {
	requests: RequestsStore,
	header?: string,
	type?: RequestStatus,
	completed?: boolean,
	withPaper?: boolean,
	disableUnderline?: boolean,
	itemType?: 'default' | 'summary' | 'user',
	className?: string,
	mapListItemFunction?: (r: PalletRequest) => JSX.Element,
	filter?: (request: PalletRequest) => PalletRequest | undefined
}

type ClassNames = 'root' | 'header' | 'list'

const decorate = withStyles<ClassNames>(() => ({
	root: {
	},
	header: {
		color: grey[700]
	},
	list: {
		marginTop: 8
	}
}))

@observer
class RequestList extends React.Component<Props & WithStyles<ClassNames>> {
	static defaultProps: Partial<Props> = {
		itemType: 'default'
	}

	mapListItem = (r: PalletRequest): JSX.Element => {
		if(this.props.itemType === 'summary') {
			return <RequestListItemSummary key={r.id} request={r} />
		} else {
			return <RequestListItem key={r.id} request={r} />
		}
	}

	getMapListItemFunction = (r: PalletRequest) => {
		if(this.props.mapListItemFunction) {
			return this.props.mapListItemFunction(r)
		} else {
			return this.mapListItem(r)
		}
	}

	getRequests = () => {
		let requests: PalletRequest[] = this.props.requests.requests

		if(this.props.filter !== undefined) {
			requests = requests.filter(this.props.filter)
		}
		
		return requests
			.filter(r => {
				if(this.props.type === undefined)
					return r
				else if(this.props.type === r.status)
					return r
			})
			.filter(r => {
				if(this.props.completed === undefined)
					return r
				else if(this.props.completed === r.isCompleted)
					return r
			})
			.map(this.getMapListItemFunction)
	}

	render() {
		const { disableUnderline } = this.props
		let header = null
		let requests = this.getRequests()

		if(this.props.header && requests.length > 0) {
			header = [
				<Typography key="header" type="headline" className={this.props.classes.header}>
					{this.props.header}
				</Typography>,
				(disableUnderline === undefined || disableUnderline === false) ? 
					<Divider key="divider" /> : null
			]
		}

		let content = (
			<List disablePadding className={this.props.classes.list}>
				{requests}
			</List>
		)

		if(this.props.withPaper) {
			content = (
				<Paper>
					{content}
				</Paper>
			)
		}

		return(
			<div className={
				classnames(this.props.className, this.props.classes.root)
			}>
				{header}

				{content}
			</div>
		)
	}
}

export default decorate(RequestList)