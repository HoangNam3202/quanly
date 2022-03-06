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
    ThemKhuVuc : (req, res) => {
        const username = req.body.Username; 
        const khuvuc = req.body.KhuVuc; 
        const sql = `Insert into khuvuc (tenkhuvuc, user) Values(? , ?)`;
        conn.query(sql, [khuvuc, username], (err, result) => {
            res.json('add success')
        })
    },
}