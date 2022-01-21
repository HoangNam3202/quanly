const conn = require('./../db')

module.exports = {
    SearchSp: (req, res) => {
        const keyword = req.body.keyword;
        const username = req.body.Username;
        if (keyword != null) {
            try {
                const sql = "select * from sanpham where tensanpham LIKE ? and user = ? LIMIT 5"
                conn.query(sql, ['%' + keyword +'%', username], (err, result) => {
                    if (err) throw err
                    res.json(result)
                })
            } catch (error) {
                console.log(error);
            }
        }
    },
}