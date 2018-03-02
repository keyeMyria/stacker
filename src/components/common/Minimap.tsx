import * as React from 'react'

import { Layer, Rect, Stage } from 'react-konva'

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

interface RectSize {
	width: number,
	height: number,
	x: number,
	y: number
}
interface Positions {
	sideLeft: RectSize,
	sideRight: RectSize,
	sideGap: RectSize,
	main: RectSize,
	mainGap: RectSize,
	column: RectSize,
	row: RectSize,
	pallet: RectSize
}
type ScaledPositions = (scale: number) => Positions
const mainPositions: ScaledPositions = (scale = 1) => ({
	sideLeft: {
		width: 4 * scale,
		height: 16 * scale,
		x: 0,
		y: 0
	},
	sideRight: {
		width: 4 * scale,
		height: 16 * scale,
		x: 0,
		y: 0
	},
	sideGap: {
		width: 2 * scale,
		height: 16 * scale,
		x: 0,
		y: 0
	},
	main: {
		width: 71 * scale,
		height: 16 * scale,
		x: 0,
		y: 0
	},
	mainGap: {
		width: 6 * scale,
		height: 16 * scale,
		x: 0,
		y: 0
	},
	column: {
		width: 1 * scale,
		height: 16 * scale,
		x: 0,
		y: 0
	},
	row: {
		width: 71 * scale,
		height: 2 * scale,
		x: 0,
		y: 0
	},
	pallet: {
		width: 1 * scale,
		height: 2 * scale,
		x: 0,
		y: 0
	}
})
const calcPositions = (pos: Positions): Positions => {
	pos.sideLeft.x = 0
	pos.sideLeft.y = 0

	pos.sideRight.x = pos.sideLeft.x + pos.sideLeft.width + pos.sideGap.width
	pos.sideRight.y = 0

	pos.main.x = pos.sideRight.x + pos.sideRight.width + pos.mainGap.width
	pos.main.y = 0

	pos.column.x = pos.sideRight.x + pos.sideRight.width + pos.mainGap.width
	pos.column.y = 0

	pos.row.x = pos.sideRight.x + pos.sideRight.width + pos.mainGap.width
	pos.row.y = 0

	pos.pallet.x = pos.sideRight.x + pos.sideRight.width + pos.mainGap.width
	pos.pallet.y = 0

	return pos
}

const calcPallet = (pos: Positions, scale: number, x: number, y: number): Positions => {
	pos.column.x = pos.column.x + scale * (x - 1)

	pos.row.y = pos.row.y + scale * (y - 1) * 2

	pos.pallet.x = pos.pallet.x + scale * (x - 1)
	pos.pallet.y = pos.pallet.y + scale * (y - 1) * 2

	return pos
}

const Minimap: React.SFC<Props> = (props: Props): JSX.Element | null => {
	if (!props.width || !props.height) {
		return null
	}

	let posData = calcPositions(mainPositions(props.scale))
	posData = calcPallet(posData, props.scale, props.x, props.y)

	return(
		<Stage width={props.width * props.scale + 6} height={props.height * props.scale + 2}>
			<Layer>
				{/* Left side */}
				<Rect
					x={posData.sideLeft.x}
					y={posData.sideLeft.y}
					width={posData.sideLeft.width}
					height={posData.sideLeft.height}
					fill={props.side === 'left' ? grey[400] : grey[200]}
				/>

				{/* Right side */}
				<Rect
					x={posData.sideRight.x}
					y={posData.sideRight.y}
					width={posData.sideRight.width}
					height={posData.sideRight.height}
					fill={props.side === 'right' ? grey[400] : grey[200]}
				/>

				{/* Full side */}
				<Rect
					x={posData.main.x}
					y={posData.main.y}
					width={posData.main.width}
					height={posData.main.height}
					fill={grey[200]}
				/>

				{/* Column position */}
				<Rect
					x={posData.column.x}
					y={posData.column.y}
					width={posData.column.width}
					height={posData.column.height}
					fill={grey[300]}
				/>

				{/* Row position */}
				<Rect
					x={posData.row.x}
					y={posData.row.y}
					width={posData.row.width}
					height={posData.row.height}
					fill={grey[300]}
				/>

				{/* Pallet position */}
				<Rect
					x={posData.pallet.x}
					y={posData.pallet.y}
					width={posData.pallet.width}
					height={posData.pallet.height}
					fill={grey[400]}
				/>
			</Layer>
		</Stage>
	)
}

Minimap.defaultProps = defaultProps

export default Minimap
