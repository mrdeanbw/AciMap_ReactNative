import AppNavigation from '../Modules/nav/AppNavigation'

export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}
