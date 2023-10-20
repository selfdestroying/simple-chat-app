import {
	CardFooter,
	IconButton,
	InputGroup,
	InputRightElement,
	Textarea,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { Context } from '../../../main'
import './ChatFooter.css'

const ChatFooter = () => {
	const [message, setMessage] = useState('')
	const { store } = useContext(Context)
	useEffect(() => {
		const tx = document.getElementsByTagName('textarea')
		for (let i = 0; i < tx.length; i++) {
			tx[i].addEventListener('input', OnInput, false)
		}

		function OnInput(this: HTMLTextAreaElement) {
			this.style.height = '0'
			this.style.height = this.scrollHeight + 'px'
		}
	}, [message])
	return (
		<CardFooter>
			<form
				onSubmit={e => {
					e.preventDefault()
					if (message != '') {
						store.sendMessage(message)
					}
					setMessage('')
				}}
				style={{ width: '100%' }}
			>
				<InputGroup>
					<Textarea
						id='autoresizing'
						placeholder='Enter message'
						onChange={e => {
							setMessage(e.target.value)
						}}
						value={message}
						resize={'none'}
						maxH={'5rem'}
						minH={'1rem'}
					/>
					<InputRightElement>
						<IconButton
							aria-label='Send'
							icon={<AiOutlineSend />}
							size={'sm'}
							_hover={{ bg: 'green.400' }}
							type='submit'
						/>
					</InputRightElement>
				</InputGroup>
			</form>
		</CardFooter>
	)
}

export default ChatFooter
