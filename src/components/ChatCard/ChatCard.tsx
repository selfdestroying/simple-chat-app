import { Card, CardBody, CardHeader, Center } from '@chakra-ui/react'
import ChatFooter from './ChatFooter/ChatFooter'

const ChatCard = () => {
	return (
		<Center h={'100%'}>
			<Card h={'100%'}>
				<CardHeader>Chat</CardHeader>
				<CardBody>Messages</CardBody>
				<ChatFooter />
			</Card>
		</Center>
	)
}

export default ChatCard
