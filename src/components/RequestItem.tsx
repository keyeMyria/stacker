import * as React from 'react'
import { observer } from 'mobx-react'

import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import { withStyles, StyleRules } from 'material-ui/styles'

import { Stage, Layer, Rect } from 'react-konva'

interface Props {
}

interface ClassNames {
	root: string,
	title: string,
	header: string,
	map: string
}

const styles: StyleRules = {
	root: {
		margin: 32,
		width: 300,
		backgroundColor: '#eeeeee'
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	header: {
		display: 'flex',
	},
	map: {
		width: 332,
		height: 32
	}
}

@observer
class RequestItem extends React.Component<Props & { classes: ClassNames }> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<div className={this.props.classes.title}>
					<div className={this.props.classes.header}>
						<Avatar>!</Avatar>
						<Typography type="headline">
							L26D
						</Typography>
					</div>
					<Typography type="body1">
						před 4 minutami
					</Typography>
				</div>
				<Stage width={170} height={32}>
					<Layer>
						<Rect
							x={0}
							y={0}
							width={8}
							height={32}
							fill='blue'
						/>

						<Rect
							x={12}
							y={0}
							width={8}
							height={32}
							fill='blue'
						/>

						<Rect
							x={24}
							y={0}
							width={142}
							height={32}
							fill='blue'
						/>

						<Rect
							x={76}
							y={0}
							width={2}
							height={32}
							fill='gray'
						/>

						<Rect
							x={24}
							y={8}
							width={142}
							height={2}
							fill='gray'
						/>
					</Layer>
			  	</Stage>
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(RequestItem)