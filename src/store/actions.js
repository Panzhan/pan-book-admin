import * as types from './mutationTypes';

export default {
    // getChannelList({ commit, state }) {
    //     return new Promise((resolve, reject) => {
    //         once(
    //             types.CHANNEL_LIST,
    //             () => {
    //                 commit(types.CHANNEL_LIST, [
    //                     {
    //                         id: '-1',
    //                         name: '全部渠道'
    //                     }
    //                 ]);
    //                 return quRequest
    //                     .send(api.common.getChannelList)
    //                     .then(res => {
    //                         resolve();
    //                         res.data.unshift({
    //                             id: '-1',
    //                             name: '全部渠道'
    //                         });
    //                         commit(types.CHANNEL_LIST, res.data);
    //                     })
    //                     .catch(reject);
    //             },
    //             resolve
    //         );
    //     });
    // },
};