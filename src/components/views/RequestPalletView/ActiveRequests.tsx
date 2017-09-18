import * as React from 'react'
import { observer } from 'mobx-react'

import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'

import { grey, common } from 'material-ui/colors'
import { withStyles, StyleRules } from 'material-ui/styles'

import PalletSelectStore from '../../../stores/PalletSelectStore'

interface Props {
	store: PalletSelectStore,
	className: string
}

interface ClassNames {
	root: string,
	title: string,
	item: string,
	itemTitle: string,
	itemAction: string
}

const styles: StyleRules = {
	root: {

	},
	title: {
		color: common['lightBlack']
	},
	item: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '8px 16px',
		backgroundColor: grey[50],
		'&:hover': {
			backgroundColor: grey[100]
		}
	},
	itemTitle: {
		fontSize: 18
	},
	itemAction: {
		display: 'flex',
		alignItems: 'center'
	}
}

@observer
class ActiveRequests extends React.Component<Props & { classes: ClassNames }> {
	render() {
		return(
			<div
				className={[
					this.props.className,
					this.props.classes.root
				].join(' ')}
			>
				<Typography type="headline" className={this.props.classes.title}>
					Aktivní položky
				</Typography>

				<Divider />

				<div className={this.props.classes.item}>
					<div>
						<Typography type="subheading">
							L35D
						</Typography>

						<Typography>
							Hutní sklad
						</Typography>
					</div>

					<div className={this.props.classes.itemAction}>
						<Button color="accent" raised dense>
							Zrusit
						</Button>
					</div>
				</div>
				
				<div className={this.props.classes.item}>
					<div>
						<Typography type="subheading">
							L35D
						</Typography>

						<Typography>
							Hutní sklad
						</Typography>
					</div>

					<div className={this.props.classes.itemAction}>
						<Button color="accent" raised dense>
							Zrusit
						</Button>
					</div>
				</div>

			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(ActiveRequests)