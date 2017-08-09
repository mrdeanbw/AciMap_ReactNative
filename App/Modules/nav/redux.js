import AppNavigation from './AppNavigation'

export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}






// import createRootNavigator from './AppNavigation'
// import { store } from '../../Setup/App'


// WHAT

// export const reducer = (state, action) => {
//   if (store && store.hasOwnProperty('getState') && store.getState().auth.obj) {
//     console.tron.log('Creating AppNavigation with user!')
//     let AppNavigation = createRootNavigator(store.getState().auth.obj) // selectize or check for obj hm?
//     const newState = AppNavigation.router.getStateForAction(action, state)
//     return newState || state
//   } else {
//     console.tron.log('Creating AppNavigation with no user.')
//     let AppNavigation = createRootNavigator()
//     const newState = AppNavigation.router.getStateForAction(action, state)
//     return newState || state
//   }
// }
