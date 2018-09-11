const axios = require('axios');

module.exports = async () => {
    const results = await axios({
        method: 'get',
        url: 'http://api.map.baidu.com/location/ip',
        params: {
            ak: '1qW3g291l6U2dsDnvbbIggtpqy4Z9mr2'
        }
    })
    const {content} = results.data;
    return `${content.address}`
}