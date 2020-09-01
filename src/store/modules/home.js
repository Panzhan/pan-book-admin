import * as types from '../mutationTypes';

const state = {
    testStr: 'string0',
    testDate: [
        { id: 1, title: '今日' },
    ],
    paymentFilterColumn: []
};

const getters = {
    // paymentFilterColumn: state => {
    //     return state.paymentFilterColumn;
    // },
};

const actions = {
    // getDate({ commit, state }, param) {
    //     let api = ''
    //     return new Promise((resolve, reject) => {
    //         return quRequest
    //             .send(api, param)
    //             .then(res => {
    //                 resolve();
    //                 commit(types.TEST_DATE, res);
    //             })
    //             .catch(reject);
    //     });
    // }
    updateString({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(param){
                    // test: 有参
                    resolve(param)
                    reject(param)
                }else{
                    // test: 无参
                    let newTestStr = 'string1'
                    resolve(newTestStr)
                    reject(newTestStr)
                }
            }, 2000)
        })
        .then(res => {
            commit(types.TEST_STRING, res )
            console.log('commit之后的string', res)
        })
        .catch(err => {
            console.log('err', err)
        })
    },
    updateDate({ commit, state }, param) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let newDate = [
                    { id: 1, title: '今日' },
                    { id: 2, title: '明日' },
                ]
                resolve(newDate)
                reject(newDate)
            }, 1000)
        })
        .then(res => {
            commit(types.TEST_DATE, res )
        })
        .catch(err => {
            console.log('err', err)
        })
    }
};

const mutations = {
    [types.TEST_DATE](state, list = []) {
        state.testDate = list;
    },
    [types.TEST_STRING](state, value = '') {
        state.testStr = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
