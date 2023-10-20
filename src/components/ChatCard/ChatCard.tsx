import {
	Box,
	Card,
	CardBody,
	CardHeader,
	Center,
	Stack,
	Text,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useRef } from 'react'
import { Context } from '../../main'
import { supabase } from '../../supabase/supabase'
import ChatFooter from './ChatFooter/ChatFooter'

const ChatCard = observer(() => {
	const { store } = useContext(Context)
	const messagesEndRef = useRef(null)
	const scrollToBottom = () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		const channel = supabase
			.channel('public:chat')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'messages',
				},
				payload => {
					console.log(payload)
					store.getMessages()
					store.getUsers()
				}
			)
			.subscribe()
		store.getMessages()
		store.getUsers()
		return () => {
			channel.unsubscribe()
		}
	}, [])

	useEffect(() => {
		scrollToBottom()
	}, [store.messages])

	return (
		<Center h={'100%'}>
			<Card h={'100%'} w={'sm'}>
				<CardHeader>Chat</CardHeader>
				<CardBody overflowY={'scroll'}>
					<Stack>
						{store.messages &&
							store.messages.map(message => {
								return (
									<Box key={message.id}>
										<Text color={'gray.500'}>
											{
												store.users?.find(u => u.id === message.user_id)
													?.username
											}
										</Text>
										<Text>{message.message}</Text>
									</Box>
								)
							})}
					</Stack>
					<div ref={messagesEndRef} />
				</CardBody>
				<ChatFooter />
			</Card>
		</Center>
	)
})

export default ChatCard
