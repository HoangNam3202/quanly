const conn = require('./../db')
const jwt = require('jsonwebtoken');

module.exports = {
    TaiKhoan: (req, res) => {
        const sql = 'Select * from taikhoan';
        conn.query(sql, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    },
    DangNhap: (req, res) => {
        const username = req.body.Username
        const password = req.body.UserPassword
        const sql = 'Select * from taikhoan where username = ? and password = ?';
        conn.query(sql, [username, password], (err, result) => {
            if (err) throw err;
            if (result.length != 0) {
                const acctk = jwt.sign({ ID: result[0].username, PASS: result[0].password }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '48h' });
                res.json({ token: acctk, info: result })
            }
            else {
                res.json('not accept');
            }
        });
    },
    KiemTraDangNhap: (req, res) => {
        const user_token = req.body.User_token;
        jwt.verify(user_token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if(decoded != undefined){
                const sql = 'Select * from taikhoan where username = ? and password = ?';
                conn.query(sql,[ decoded.ID, decoded.PASS ] ,(err, result) => {
                    if (err) throw err;
                    if(result.length < 0){
                        res.json('remember_denied');
                    }
                    else{
                        res.json(decoded.ID)
                    }
                });
            }
            else{
                res.json('remember_denied');
            }
        })


    },
}