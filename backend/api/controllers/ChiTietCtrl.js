const conn = require('../db');

module.exports = {
    TatCaCTBan : (req, res) => {
        const username = req.body.Username;
        const sql = 'select * from chitietban WHERE user = ?'
        conn.query(sql,[ username ],(err, result) => {
            if (err) throw err
            if (result.length > 0) {
                res.json(result);
            }
            else {
                res.json('empty');
            }
        })
    },
    ChiTietBan: (req, res) => {
        const username = req.body.Username
        const idBan = req.body.idBan
        const phanCap = req.body.phanCap
        const sql = 'select * from chitietban where user = ? and idban = ? and phcap = ?'
        conn.query(sql, [username, idBan, phanCap], (err, result) => {
            if (err) throw err
            if (result.length > 0) {
                res.json(result);
            }
            else {
                res.json('empty');
            }
        })
    },

    SoLuongCT: (req, res) => {
        const username = req.body.Username
        const idBan = req.body.idBan
        const phanCap = req.body.phanCap
        const tenMon = req.body.tenMon
        const soLuong = req.body.soLuong
        const sql = 'Update chitietban set soluong = ? WHERE user = ? and idban = ? and phcap = ? and tensanpham = ?'
        conn.query(sql, [soLuong, username, idBan, phanCap, tenMon], (err, result) => {
            if (err) throw err
            res.json('result');
        })
    },

    ThemSpCT: (req, res) => {
        const username = req.body.Username
        const idBan = req.body.idBan
        const phanCap = req.body.phanCap
        const tenMon = req.body.tenMon
        const giaSP = req.body.giaSP
        const DVT = req.body.Dvt

        const sql_sl = 'select tensanpham, soluong from chitietban where user = ? and idban = ? and phcap = ? and tensanpham = ?'
        conn.query(sql_sl, [username, idBan, phanCap, tenMon], (err, result) => {
            if (err) throw err
            if (result.length > 0) {
                const sql = 'Update chitietban set soluong = ? WHERE user = ? and idban = ? and phcap = ? and tensanpham = ?'
                conn.query(sql, [Number.parseInt(result[0].soluong) + 1 , username, idBan, phanCap, tenMon], (err, result) => {
                    if (err) throw err
                    res.json('result');
                })
            }
            else {
                const sql = 'INSERT INTO chitietban (idban, phcap, tensanpham, soluong , giasanpham, DVT, user)'
                    + ' VALUES (? , ? , ? , 1 , ? , ? , ?)';
                conn.query(sql, [idBan, phanCap, tenMon, giaSP, DVT, username,], (err, result) => {
                    if (err) throw err
                    res.json('result');
                })
            }
        })


    },
    XoaCT : (req, res) => {
        const username = req.body.Username
        const idBan = req.body.idBan
        const phanCap = req.body.phanCap
        const tenMon = req.body.tenMon
        const sql = 'Delete from chitietban WHERE user = ? and idban = ? and phcap = ? and tensanpham = ?';
        conn.query(sql , [ username , idBan , phanCap , tenMon] , (err , result) =>{
            if (err) throw err
            res.json('delete complete');
        })
    },
}