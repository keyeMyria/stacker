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
	width: 87,
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
		<Stage width={props.width * props.scale + 6} height={props.height * props.scale + 2}>
			<Layer>
				{/* Left side */}
				<Rect
					x={0}
					y={0}
					width={4 * props.scale + 2}
					height={props.height * props.scale + 2}
					fill={props.side === 'left' ? grey[400] : grey[300]}
				/>
				<Rect
					x={0 + 1}
					y={0 + 1}
					width={4 * props.scale}
					height={props.height * props.scale}
					fill={props.side === 'left' ? grey[300] : grey[200]}
				/>

				{/* Right side */}
				<Rect
					x={6 * props.scale + 2}
					y={0}
					width={4 * props.scale + 2}
					height={props.height * props.scale + 2}
					fill={props.side === 'right' ? grey[400] : grey[300]}
				/>
				<Rect
					x={6 * props.scale + 3}
					y={0 + 1}
					width={4 * props.scale}
					height={props.height * props.scale}
					fill={props.side === 'right' ? grey[300] : grey[200]}
				/>

				{/* Full side */}
				<Rect
					x={16 * props.scale + 4}
					y={0}
					width={71 * props.scale + 2}
					height={16 * props.scale + 2}
					fill={grey[300]}
				/>
				<Rect
					x={16 * props.scale + 5}
					y={0 + 1}
					width={71 * props.scale}
					height={16 * props.scale}
					fill={grey[200]}
				/>

				{/* Column position */}
				<Rect
					x={16 * props.scale + props.x * props.scale + 2}
					y={1}
					width={props.scale}
					height={16 * props.scale}
					fill={grey[300]}
				/>

				{/* Row position */}
				<Rect
					x={16 * props.scale + 5}
					y={2 * props.y * props.scale + 1}
					width={71 * props.scale}
					height={2 * props.scale}
					fill={grey[300]}
				/>

				{/* Pallet position */}
				<Rect
					x={16 * props.scale + props.x * props.scale + 2}
					y={2 * props.y * props.scale + 1}
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