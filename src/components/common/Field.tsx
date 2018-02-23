import * as classnames from 'classnames'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

interface Props {
	title: string,
	content: string,
	className?: string
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(theme => ({
	root: {
		marginBottom: 8,
		'&:last-child': {
			marginBottom: 0
		}
	}
}))

class Field extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		if (this.props.content === undefined || this.props.content === null) {
			return null
		}

		const rootClasses = classnames(
			this.props.classes.root,
			this.props.className
		)

		return(
			<div className={rootClasses}>
				<Typography type="caption">
					{this.props.title}
				</Typography>
				<Typography>
					{this.props.content}
				</Typography>
			</div>
		)
	}
}

export default decorate(Field)
