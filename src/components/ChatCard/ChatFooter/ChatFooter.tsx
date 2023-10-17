import {
	CardFooter,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { Context } from '../../../main'

const ChatFooter = () => {
	const [message, setMessage] = useState('')
	const { store } = useContext(Context)
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
					<Input
						placeholder='Enter message'
						onChange={e => setMessage(e.target.value)}
						value={message}
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
