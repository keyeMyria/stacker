import * as React from 'react'

import { Stage, Layer, Rect } from 'react-konva'

import { grey } from 'material-ui/colors'

interface Props {
	width?: number,
	height?: number,
	scale: number,
	side: string,
	x: number,
	y: number
}

const defaultProps: Props = {
	width: 85,
	height: 16,
	scale: 1,
	side: '',
	x: 0,
	y: 0
}

const Minimap: React.SFC<Props> = (props: Props): JSX.Element | null => {
	if(!props.width || !props.height)
		return null

	return(
		<Stage width={props.width * props.scale} height={props.height * props.scale}>
			<Layer>
				{/* Left side */}
				<Rect
					x={0}
					y={0}
					width={4 * props.scale}
					height={props.height * props.scale}
					fill={props.side === 'left' ?  grey[300] : grey[100]}
				/>

				{/* Right side */}
				<Rect
					x={6 * props.scale}
					y={0}
					width={4 * props.scale}
					height={props.height * props.scale}
					fill={props.side === 'right' ?  grey[300] : grey[100]}
				/>

				{/* Full side */}
				<Rect
					x={12 * props.scale}
					y={0}
					width={71 * props.scale}
					height={16 * props.scale}
					fill={grey[100]}
				/>

				{/* Column position */}
				<Rect
					x={12 * props.scale + props.x * props.scale}
					y={0}
					width={props.scale}
					height={16 * props.scale}
					fill={grey[200]}
				/>

				{/* Row position */}
				<Rect
					x={12 * props.scale}
					y={2 * props.y * props.scale}
					width={71 * props.scale}
					height={2 * props.scale}
					fill={grey[200]}
				/>

				{/* Pallet position */}
				<Rect
					x={12 * props.scale + props.x * props.scale}
					y={2 * props.y * props.scale}
					width={props.scale}
					height={2 * props.scale}
					fill={grey[400]}
				/>
			</Layer>
		</Stage>
	)
}

Minimap.defaultProps = defaultProps

export default Minimap