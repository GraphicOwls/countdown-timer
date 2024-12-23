/** @format */

'use client'
import { useState, useEffect, useRef } from 'react'
import * as motion from 'motion/react-client'
import { useAnimate } from 'motion/react'
import { Button } from '@/components/ui/button'
import NumberFlow from '@number-flow/react'
import { Minus, Plus } from 'lucide-react'
import ButtonGroup from '@/components/button-group'

export default function Home() {
	const defaultTime = 5
	const [time, setTime] = useState(defaultTime)
	const [timeRemaining, setTimeRemaining] = useState(time)
	const [isRunning, setIsRunning] = useState(false)
	const [increment, setIncrement] = useState(5)
	const intervalRef = useRef(null)
	const startTimeRef = useRef(null)
	const [scope, animate] = useAnimate()
	const [lastTick, setLastTick] = useState(time)

	const getCurrentSecond = () => {
		const currentTimeLeft = Math.max(
			0,
			(startTimeRef.current - Date.now()) / 1000,
		)
		return Math.ceil(currentTimeLeft)
	}

	const startTimer = () => {
		if (!isRunning && timeRemaining > 0) {
			setIsRunning(true)
			playTickSound()
			startTimeRef.current = Date.now() + timeRemaining * 1000
			animate(
				scope.current,
				{ pathLength: 0 },
				{ duration: timeRemaining, ease: 'linear' },
			)

			intervalRef.current = setInterval(() => {
				const currentSecond = getCurrentSecond()
				if (currentSecond <= 0) {
					clearInterval(intervalRef.current)
					setIsRunning(false)
					timerComplete()
				}
				setTimeRemaining(currentSecond)
				if (currentSecond >= 1) {
					playTickSound()
				}
				setLastTick(currentSecond)
			}, 1000)
		}
	}

	const pauseTimer = () => {
		clearInterval(intervalRef.current)
		setIsRunning(false)
		animate(
			scope.current,
			{ pathLength: timeRemaining / time },
			{ duration: 0 },
		)
	}

	const resetTimer = () => {
		clearInterval(intervalRef.current)
		setIsRunning(false)
		updateTime(defaultTime)
		animate(
			scope.current,
			{ pathLength: 1 },
			{ duration: 0.4, ease: 'easeOut' },
		)
	}

	// Cleanup interval on component unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [])

	const handleIncrementChange = (newValue) => {
		setIncrement(Number(newValue)) // Convert string to number
	}

	const updateTime = (newTime) => {
		if (newTime >= 0) {
			setTime(newTime)
			setTimeRemaining(newTime)
			// Animate to new time's progress
			animate(
				scope.current,
				{ pathLength: 1 },
				{ duration: 0.4, ease: 'easeOut' },
			)
		}
	}

	const playTickSound = () => {
		const audio = new Audio('/sounds/tick2.mp3')
		audio.play()
	}

	const timerComplete = () => {
		const audio = new Audio('/sounds/complete.mp3')
		audio.play()
	}

	return (
		<div className='grid grid-rows-[20px_1fr_20px] bg-background items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center justify-center bg-secondary/40 px-8 pt-16 pb-8 rounded-2xl border border-primary/10 shadow-xl'>
				<div className='flex items-center gap-8 bg-background rounded-full'>
					<motion.div
						className='rounded-full w-[200px] h-[200px] leading-none flex items-center justify-center relative'
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.4,
							delay: 0.2,
							scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
						}}
					>
						<svg
							className='absolute inset-0 w-full h-full'
							viewBox='0 0 100 100'
							xmlns='http://www.w3.org/2000/svg'
						>
							<motion.path
								ref={scope}
								d='M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94'
								fill='none'
								strokeWidth='6'
								strokeLinecap='round'
								stroke='hsl(var(--foreground))'
								initial={{ pathLength: 1 }}
							/>
						</svg>
						<NumberFlow
							value={Math.ceil(timeRemaining)}
							transformTiming={{
								duration: 500,
								easing:
									'linear(0, 0.0015, 0.0059 1.07%, 0.025, 0.0546 3.49%, 0.097 4.84%, 0.1958 7.39%, 0.4359 12.9%, 0.5465 15.58%, 0.6502 18.41%, 0.7351 21.09%, 0.8091, 0.8685 26.74%, 0.8942, 0.9164, 0.9356 31.17%, 0.9533 32.78%, 0.9781 35.74%, 0.9882 37.35%, 0.9967 39.1%, 1.0082 42.72%, 1.0142 47.02%, 1.0144 53.47%, 1.0054 68.38%, 1.0019 77.39%, 0.9998 99.96%)',
							}}
							spinTiming={{
								duration: 500,
								easing:
									'linear(0, 0.0015, 0.0059 1.07%, 0.025, 0.0546 3.49%, 0.097 4.84%, 0.1958 7.39%, 0.4359 12.9%, 0.5465 15.58%, 0.6502 18.41%, 0.7351 21.09%, 0.8091, 0.8685 26.74%, 0.8942, 0.9164, 0.9356 31.17%, 0.9533 32.78%, 0.9781 35.74%, 0.9882 37.35%, 0.9967 39.1%, 1.0082 42.72%, 1.0142 47.02%, 1.0144 53.47%, 1.0054 68.38%, 1.0019 77.39%, 0.9998 99.96%)',
							}}
							className='text-7xl font-bold text-center font-mono'
						/>
					</motion.div>
				</div>

				{/* CONTROLS */}
				<div className='flex items-center gap-[2px] border border-secondary p-[2px] rounded-full'>
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.4,
							delay: 0,
							scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
						}}
					>
						<Button
							className='h-9 rounded-tl-3xl rounded-bl-3xl rounded-tr rounded-br bg-secondary text-secondary-foreground hover:bg-secondary/80'
							onClick={() => updateTime(time - increment)}
							disabled={isRunning}
						>
							<Minus />
						</Button>
					</motion.div>
					<ButtonGroup
						currentValue={String(increment)} // Convert number to string
						onValueChange={handleIncrementChange}
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.4,
							delay: 0.4,
							scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
						}}
					>
						<Button
							className='h-9 rounded-tr-3xl rounded-br-3xl rounded-tl rounded-bl bg-secondary text-secondary-foreground hover:bg-secondary/80'
							onClick={() => updateTime(time + increment)}
							disabled={isRunning}
						>
							<Plus />
						</Button>
					</motion.div>
				</div>
				<div className='flex gap-2 items-center w-full'>
					<Button
						variant='secondary'
						onClick={resetTimer}
						className='flex-1'
						disabled={isRunning}
					>
						Reset
					</Button>
					<Button
						onClick={isRunning ? pauseTimer : startTimer}
						className='flex-1'
					>
						{isRunning ? 'Pause' : 'Start'} Timer
					</Button>
				</div>
			</main>
		</div>
	)
}
