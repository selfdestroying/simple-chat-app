import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
	Alert,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	FormControl,
	FormErrorMessage,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { BsDiscord } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { Context } from '../../main'

const LoginForm = observer(() => {
	const { store } = useContext(Context)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [isValidEmail, setIsValidEmail] = useState(true)
	const [isValidPassword, setIsValidPassword] = useState(true)

	const [show, setShow] = useState(false)
	const handleClick = () => setShow(!show)

	const validateEmail = (value: string) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		setIsValidEmail(re.test(String(value).toLowerCase()))

		return re.test(String(value).toLowerCase())
	}

	const validatePassword = (value: string) => {
		setIsValidPassword(value != '' && value.length >= 6)
		return value != '' && value.length >= 6
	}

	const validate = () => {
		const check1 = validateEmail(email)
		const check2 = validatePassword(password)
		return check1 && check2
	}

	return (
		<Card align={'center'} maxW={'xs'}>
			<CardBody>
				<Stack>
					{store.isInvalid.status && (
						<Alert status='error' borderRadius={'md'}>
							{store.isInvalid.message}
						</Alert>
					)}
					<FormControl isInvalid={!isValidEmail}>
						<Input
							_focus={{
								borderColor: 'none',
							}}
							_focusVisible={{
								borderColor: 'none',
							}}
							placeholder='Email'
							type='email'
							onChange={e => {
								setEmail(e.target.value)
								validateEmail(e.target.value)
							}}
						/>
						{!isValidEmail && (
							<FormErrorMessage>Некорректный email</FormErrorMessage>
						)}
					</FormControl>
					<InputGroup size='md'>
						<FormControl isInvalid={!isValidPassword}>
							<Input
								_focus={{
									borderColor: 'none',
								}}
								_focusVisible={{
									borderColor: 'none',
								}}
								placeholder='Enter password'
								type={show ? 'text' : 'password'}
								onChange={e => {
									setPassword(e.target.value)
									validatePassword(e.target.value)
								}}
							/>
							{!isValidPassword && (
								<FormErrorMessage>Некорректный пароль</FormErrorMessage>
							)}
							<InputRightElement width='3.5rem'>
								<IconButton
									icon={show ? <ViewIcon /> : <ViewOffIcon />}
									aria-label={show ? 'Hide password' : 'Show password'}
									h='1.75rem'
									size='sm'
									onClick={handleClick}
								>
									{show ? 'Hide' : 'Show'}
								</IconButton>
							</InputRightElement>
						</FormControl>
					</InputGroup>
					<ButtonGroup>
						<Button
							flex={'1'}
							onClick={() => {
								if (validate()) {
									store.registration(email, password)
								}
							}}
							isLoading={store.isLoading}
						>
							Sign Up
						</Button>
						<Button
							flex={'1'}
							onClick={() => {
								if (validate()) {
									store.login(email, password)
								}
							}}
							isLoading={store.isLoading}
						>
							Sign In
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton
							aria-label='Discord'
							icon={<BsDiscord />}
							onClick={() => store.discord()}
							_hover={{
								bg: '#7289da',
							}}
						/>
						<IconButton
							aria-label='Google'
							icon={<FcGoogle />}
							onClick={() => store.google()}
							_hover={{
								bg: 'whiteAlpha.900',
							}}
						/>
						<Button flex={'1'}>Нажми на меня!</Button>
					</ButtonGroup>
				</Stack>
			</CardBody>
		</Card>
	)
})

export default LoginForm
