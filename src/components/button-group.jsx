/** @format */

// Dependencies: pnpm install lucide-react @radix-ui/react-toggle-group

'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useState } from 'react'

export default function ButtonGroup({ currentValue, onValueChange }) {
	const [value, setValue] = useState(currentValue)

	return (
		<ToggleGroup
			className='inline-flex divide-x rtl:space-x-reverse gap-[2px]'
			type='single'
			value={value}
			size='sm'
			onValueChange={(value) => {
				if (value) {
					setValue(value)
					onValueChange(value)
				}
			}}
		>
			<ToggleGroupItem
				className='bg-transparent border-none text-secondary-foreground/50 shadow-none hover:text-secondary-foreground rounded hover:bg-secondary focus-visible:z-10 data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground p-0 py-1'
				aria-label='One Second'
				value='1'
			>
				1s
			</ToggleGroupItem>
			<ToggleGroupItem
				className='bg-transparent border-none text-secondary-foreground/50 shadow-none hover:text-secondary-foreground rounded hover:bg-secondary focus-visible:z-10 data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground p-0 py-1'
				aria-label='Five Seconds'
				value='5'
			>
				5s
			</ToggleGroupItem>
			<ToggleGroupItem
				className='bg-transparent border-none text-secondary-foreground/50 shadow-none hover:text-secondary-foreground rounded hover:bg-secondary focus-visible:z-10 data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground p-0 py-1'
				aria-label='Ten Seconds'
				value='10'
			>
				10s
			</ToggleGroupItem>
			<ToggleGroupItem
				className='bg-transparent border-none text-secondary-foreground/50 shadow-none hover:text-secondary-foreground rounded hover:bg-secondary focus-visible:z-10 data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground p-0 py-1'
				aria-label='Twenty Seconds'
				value='20'
			>
				20s
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
