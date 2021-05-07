import * as types from './mutationTypes'

export default {
    [types.MENU_MAP](state, list = []) {
        state.menuMap = list
    },
}
