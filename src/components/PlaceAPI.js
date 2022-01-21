import API_URL from '../contants/contants';

const PlaceApi = {
    LayKhuVuc: async (tendnprops) => {
        const result = await fetch(API_URL + '/khuvuc', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: tendnprops
            })
        })
            .then(res => res.text())
            .then(data => {
                return JSON.parse(data);
            })
        return result;
    }
}
export default PlaceApi;