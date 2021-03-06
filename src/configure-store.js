import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { AppReducer } from './app';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
	const middlewares = []
    if (process.env.NODE_ENV === 'development') {
        middlewares.push(logger)
    }
	const composeEnhancer = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(
		AppReducer,
		preloadedState,
		composeEnhancer(
			applyMiddleware(
				routerMiddleware(history),
				thunk,
                ...middlewares
			),
		),
	);

	return store;
}