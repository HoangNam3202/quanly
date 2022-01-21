const conn = require('./../db')

module.exports = {
    KhuVuc : (req, res) => {
        const username = req.body.Username
        const sql = 'Select * from khuvuc where user = ?'
        conn.query(sql , [ username ], (err, result) => {
            if (err) throw err;
            if (result.length != 0) {
                res.json(result)
            }
        })
    },
}