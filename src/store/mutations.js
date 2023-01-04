import {
  SET_LOADING,
  SET_UNREAD,
  SET_MESSAGELIST
} from './mutation_types.js'

export default {
  // 设置是否正在加载
  [SET_LOADING] (state, loadstate) {
    state.isLoading = loadstate
  },
  [SET_UNREAD] (state, loadstate) {
    state.unread = loadstate
  },
  [SET_MESSAGELIST] (state, loadstate) {
    state.messageList = loadstate
  }
}
