import React from 'react'

// React Select
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import chroma from 'chroma-js'

// Select Data
import { roleTitleOptions } from './docs/data'

// dot styles
const dot = (color = '#ccc') => ({
	alignItems: 'center',
	display: 'flex',

	':before': {
		backgroundColor: color,
		borderRadius: 10,
		content: '" "',
		display: 'block',
		marginRight: 8,
		height: 10,
		width: 10
	}
})

// Styles
const colourStyles = {
	control: styles => ({ ...styles, backgroundColor: 'white' }),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		const color = chroma(data.color)
		return {
			...styles,
			...dot(color.alpha(0.5).css()),
			backgroundColor: isDisabled
				? null
				: isSelected
				? data.color
				: isFocused
				? color.alpha(0.1).css()
				: null,
			color: isDisabled
				? '#ccc'
				: isSelected
				? chroma.contrast(color, 'white') > 2
					? 'white'
					: 'black'
				: data.color,
			cursor: isDisabled ? 'not-allowed' : 'default'
		}
	},
	multiValue: (styles, { data }) => {
		const color = chroma(data.color)
		return {
			...styles,
			//	...dot(color.alpha(0.5).css()),
			backgroundColor: color.alpha(0.1).css()
		}
	},
	multiValueLabel: (styles, { data }) => ({
		...styles,
		...dot(
			chroma(data.color)
				.alpha(0.5)
				.css()
		),
		color: data.color
	}),
	multiValueRemove: (styles, { data }) => ({
		...styles,
		color: data.color,
		':hover': {
			backgroundColor: data.color,
			color: 'white'
		}
	})
}

export default () => (
	<div
		style={{
			margin: 'auto',
			width: '45%',
			marginTop: '20rem'
		}}
	>
		<Select
			placeholder="They should have these sort of skills"
			closeMenuOnSelect={false}
			components={makeAnimated()}
			defaultValue={[roleTitleOptions[0], roleTitleOptions[1]]}
			isMulti
			options={roleTitleOptions}
			styles={colourStyles}
			theme={theme => ({
				...theme,
				fontFamily: 'Open Sans',
				borderColor: chroma(theme.colors.primary)
					.alpha(0.5)
					.css(),
				colors: {
					primary: '5ebeff',
					...theme.colors
				}
			})}
		/>
	</div>
)
