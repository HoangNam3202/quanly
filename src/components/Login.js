import '../css/Login.css';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from "react-cookie";

//images
import eye_password from '../images/eye_password.png';

//api
import API_URL from '../contants/contants';
toast.configure();
function Login() {
    const [cookies_time, setCookieTimes, removeCookie] = useCookies(['lg_t']);
    const [userName, setUserName] = useState('82 Hung Vuong');
    const [userPassword, setPassword] = useState('hoangnam');
    const [typeOfPw, setTypeOfPw] = useState('password');
    const [cookies, setCookie] = useCookies(['ut']);

    useEffect(() => {

    }, [])

    const notifyERR = (err, dur) => toast.error(err, {
        autoClose: dur,
        // hideProgressBar:true
    });
    const notifySUCCESS = (err, dur) => toast.success(err, {
        autoClose: dur,
        // hideProgressBar:true
    });
    const dangNhap = async () => {
        if (!cookies_time.lg_t) {
            cookies_time.lg_t = 0;
        }
        if (Number.parseInt(cookies_time.lg_t) + 1 > 3) {
            notifyERR('Tài khoản hiện đang bị tạm khóa. Vui lòng thử lại sau 3 phút !', 5000)
        }
        else {
            if (userName == undefined || userName == '' || userName == null) {
                notifyERR("Vui lòng điền 'Tên đăng nhập' !", 3000);
            }
            else {
                if (userPassword == undefined || userPassword == '' || userPassword == null) {
                    notifyERR("Vui lòng điền 'Mật khẩu' !", 3000);
                }
                else {
                    await fetch(API_URL + '/dangnhap', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            Username: userName,
                            UserPassword: userPassword
                        })
                    })
                        .then(res => res.text())
                        .then(data => {
                            if (data == '"not accept"') { // :))
                                notifyERR('Tên đăng nhập hoặc mật khẩu không chính xác.', 5000)
                                setCookie('lg_t', Number.parseInt(cookies_time.lg_t) + 1, { path: "/", maxAge: 180 });
                                // removeCookie('lg_t', { path: '/' });

                            }
                            else {
                                var userData = JSON.parse(data);
                                setCookie('ut', userData.token, { path: "/", maxAge: 172800 });
                                notifySUCCESS('Đăng nhập thành công', 5000);
                                window.location.replace('/');

                            }
                        })
                }
            }
        }

    }
    const ThayKieuMK = () => {
        if (typeOfPw == 'password') {
            setTypeOfPw('text')
        }
        else {
            setTypeOfPw('password')
        }
    };
    const Enter = (e) => {
        if (e.code === 'Enter') {
            dangNhap();
        }
    }
    return (
        <div>
            <ToastContainer limit={2} />
            <div className='lg_body'>
                <div className='lg_modal_par'>
                    <div className='lg_border_ani'></div>
                    <div className='lg_modal'>
                        <div className='lg_modal_child'>
                            <div className='lg_title_login'>Đăng Nhập</div>
                            <div className='lg_input_par'>
                                <input value={userName} onChange={(text) => { setUserName(text.target.value) }} onKeyPress={(e) => { Enter(e) }} placeholder='Tên đăng nhập' className='lg_input'></input>
                                <div className='lg_div_pass'>
                                    <input value={userPassword} onChange={(text) => { setPassword(text.target.value) }} onKeyPress={(e) => { Enter(e) }} type={typeOfPw} placeholder='Mật khẩu' className='lg_input'></input>
                                    <img onClick={ThayKieuMK} className='lg_img_eye_pass' src={eye_password}></img>
                                    {typeOfPw == 'password' ?
                                        <div onClick={ThayKieuMK} className='lg_type_stick'></div>
                                        : null}
                                </div>
                            </div>
                            <button onClick={dangNhap} className='lg_btn_login'>Đăng nhập</button>
                            <div className='lg_register_par'>
                                <button onClick={() => { alert('Nam lười nên chưa làm') }} className='lg_btn_forgot'>Quên mật khẩu ?</button>
                                <a onClick={() => { alert('Nam lười nên chưa làm') }} className='lg_btn_register' target='_blank'>Đăng ký</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
