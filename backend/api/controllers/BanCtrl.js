const conn = require('./../db')

module.exports = {
    BanTheoKV : (req, res) => {
        const username = req.body.Username
        const khuVuc = req.body.khuVuc
        const sql = 'select * from ban where user = ? '
        conn.query(sql , [username], (err, result) => {
            if (err) throw err
            res.json(result);
        })

    },
}