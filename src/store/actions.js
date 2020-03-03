import types from './mutation-types'

const increaseCounter = ({ commit }) => {
    commit(types.SET_COUNTER)
}

export default {
    increaseCounter
}
