import {
	CardFooter,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'

const ChatFooter = () => {
	const [message, setMessage] = useState('')

	return (
		<CardFooter>
			<form
				onSubmit={e => {
					e.preventDefault()
					if (message) {
						console.log(message)
					}
				}}
			>
				<InputGroup>
					<Input
						placeholder='Enter message'
						onChange={e => setMessage(e.target.value)}
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
