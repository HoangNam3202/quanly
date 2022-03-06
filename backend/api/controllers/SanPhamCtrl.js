const conn = require('./../db')

module.exports = {
    TimKiemSP: (req, res) => {
        const keyword = req.body.keyword;
        const username = req.body.Username;
        if (keyword != null) {
            try {
                const sql = "select * from sanpham where tensanpham LIKE ? and user = ? LIMIT 5"
                conn.query(sql, ['%' + keyword + '%', username], (err, result) => {
                    if (err) throw err
                    res.json(result)
                })
            } catch (error) {
                console.log(error);
            }
        }
    },
    ThemSanPham: (req, res) => {
        const username = req.body.Username;
        const nameProduct = req.body.tensp;
        const priceProduct = req.body.giasp;
        const sql = `Insert into sanpham (tensanpham, giaSanPham, donViTinh, hinhAnh, user) Values(? , ?, 'ly', 'null', ?)`;
        conn.query(sql, [nameProduct, priceProduct, username], (err, result) => {
            res.json('add success')
        })
    },
}