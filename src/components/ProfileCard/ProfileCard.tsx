import {
	Card,
	CardBody,
	Flex,
	IconButton,
	Spacer,
	Text,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import * as emoji from 'node-emoji'
import { useContext } from 'react'
import { CiLogout } from 'react-icons/ci'
import { Context } from '../../main'

const ProfileCard = observer(() => {
	const { store } = useContext(Context)

	return (
		<Flex
			pos={'absolute'}
			bottom={'0'}
			right={'1rem'}
			top={'1rem'}
			left={'0'}
			h={'max-content'}
		>
			<Spacer />
			<Card size={'sm'}>
				<CardBody
					display={'flex'}
					justifyContent={'space-around'}
					alignItems={'center'}
				>
					<Text>
						{emoji.random().emoji} {store?.user?.email}
					</Text>
					<IconButton
						ml={'1.5'}
						size={'sm'}
						aria-label='Logout'
						icon={<CiLogout />}
						onClick={() => store.logout()}
						_hover={{
							bg: 'red.400',
						}}
					/>
				</CardBody>
			</Card>
		</Flex>
	)
})

export default ProfileCard
