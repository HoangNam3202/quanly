module.exports = function(app){
    //tai khoan
    const taiKhoanCtrl = require('./controllers/TaiKhoanCtrl')
    app.route('/taikhoan').get(taiKhoanCtrl.TaiKhoan)
    app.route('/dangnhap').post(taiKhoanCtrl.DangNhap)
    app.route('/ktdangnhap').post(taiKhoanCtrl.KiemTraDangNhap)

    //khu vuc
    const khuVucCtrl = require('./controllers/KhuVucCtrl')
    app.route('/khuvuc').post(khuVucCtrl.KhuVuc)

    //ban
    const banCtrl = require('./controllers/BanCtrl')
    app.route('/bantheokv').post(banCtrl.BanTheoKV)

    //san pham
    const SanPhamCtrl = require('./controllers/SanPhamCtrl')
    app.route('/search').post(SanPhamCtrl.SearchSp)

    //chi tiet ban
    const ChiTietCtrl = require('./controllers/ChiTietCtrl')
    app.route('/tatcactban').post(ChiTietCtrl.TatCaCTBan)
    app.route('/chitietban').post(ChiTietCtrl.ChiTietBan)
    app.route('/capnhatsl').post(ChiTietCtrl.SoLuongCT)
    app.route('/themSPCT').post(ChiTietCtrl.ThemSpCT)
    app.route('/xoaSPCT').post(ChiTietCtrl.XoaCT)
}