const axios = require('axios');

module.exports = async(location) => {
    const results = await axios({
        method: 'get',
        url: 'http://v.juhe.cn/weather/index',
        params: {
            format: 1,
            cityname: location,
            dtype: 'json',
            key: '3beb124e381edb807b879d9526a82d3e'
        }
    })
    return results.data
}