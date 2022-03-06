import { useState } from 'react';
import { useCookies } from 'react-cookie';
import '../css/MenuOption.css'
import ModalInput from './ModalInput';

const MenuOptions = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['ut']);
    const { setHandleModal, setNameModal } = props;
    return (
        <div className="menu_options_container">
            <div>
                <button
                    onClick={() => {
                        setHandleModal(true);
                        setNameModal('Khu Vực')
                    }}
                >
                    Thêm Khu Vực
                </button>
            </div>
            <div>
                <button
                    onClick={() => {
                        setHandleModal(true);
                        setNameModal('Sản Phẩm')
                    }}
                >Thêm Sản Phẩm</button>
            </div>
            <div>
                <button>Hóa Đơn</button>
            </div>
            <div>
                <button
                    onClick={() => {
                        removeCookie('ut', { path: '/' });
                        window.location.replace('/login');
                    }}
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}
export default MenuOptions;