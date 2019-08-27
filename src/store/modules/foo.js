const random = () => {
    const words = 'qpwoeirutylaksjdhfgmznxbcv'
    const wordsLen = words.length;
    const res = []
    const length = Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < length; i++) {
        res.push({
            id: i,
            name: words.slice(0, Math.floor(Math.random() * wordsLen))
        })
    }
    return res
}

const fetch = () => new Promise(resolve => {
    setTimeout(() => {
        console.log('fetched')
        resolve(random())
    }, 1500)
})
    
export default {
    namespaced: true,
    // 重要信息：state 必须是一个函数，
    // 因此可以创建多个实例化该模块
    state: () => ({
      count: 0,
      list: [],
    }),
    actions: {
      inc: ({ commit }) => commit('inc'),
      getItems: ({ commit }) => {
          return fetch().then(data => {
              commit('fetchList', data)
          })
      }
    },
    mutations: {
      inc: state => state.count++,
      fetchList: (state, payload) => state.list = payload
    }
  }