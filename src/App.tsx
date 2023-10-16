import { Box, Center } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import './App.css'
import ChatCard from './components/ChatCard/ChatCard'
import LoginForm from './components/Login/LoginForm'
import ProfileCard from './components/ProfileCard/ProfileCard'
import { Context } from './main'

const App = observer(() => {
	const { store } = useContext(Context)

	useEffect(() => {
		store.checkAuth()
	}, [])
	return (
		<Box h={'100vh'} p={'1rem'}>
			{store.isAuth ? (
				<>
					<ChatCard />
					<ProfileCard />
				</>
			) : (
				<Center h={'100vh'}>
					<LoginForm />
				</Center>
			)}
		</Box>
	)
})

export default App
