import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Store from './store/store.ts'

interface State {
	store: Store
}

const store = new Store()

export const Context = createContext<State>({
	store,
})

const config: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: true,
}

const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ChakraProvider theme={theme}>
		<Context.Provider value={{ store }}>
			<App />
		</Context.Provider>
	</ChakraProvider>
)
