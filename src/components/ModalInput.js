import { useState } from 'react';
import API_URL from '../contants/contants';
import '../css/ModalInput.css'
import close_menu from '../images/close_menu.png'
const ModalInput = (props) => {
    const { 
        tendangnhap,
        nameModal,
        setHandleModal,
        setKhuVuc,
    } = props;
    const [nameItem, setNameItem] = useState();
    const [priceItem, setPriceItem] = useState();

    const handleAddPlace = async () => {
        await fetch(API_URL + '/themkhuvuc', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: tendangnhap,
                KhuVuc: nameItem
            })
        })
            .then(res => res.json())
            .then(data => {
                setHandleModal(false)
                const khuVuc = {
                    // idkhuvuc: 1, 
                    tenkhuvuc: nameItem, 
                    user: tendangnhap
                };
                setKhuVuc(prev => [...prev, khuVuc])
                alert('Thêm khu vực thành công')
            })
    };
    const handleAddProduct = async () => {
        await fetch(API_URL + '/themsp', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: tendangnhap,
                tensp: nameItem,
                giasp: priceItem,
            })
        })
            .then(res => res.json())
            .then(data => {
                setHandleModal(false)
                alert('Thêm sản phẩm thành công')
            })
    }
    return (
        <div className="modal_input_container">
            <div className="modal_form">
                <div className='modal_title'>
                    Thêm {nameModal}
                    <div
                        onClick={() => { setHandleModal(false) }}
                        className='modal_close_btn'
                    >
                        <img src={close_menu} width={20}></img>
                    </div>
                </div>
                <div className='modal_input_name'>
                    <div>Tên {nameModal}</div>
                    <input
                        value={nameItem}
                        onChange={(event) => { setNameItem(event.target.value) }}
                        placeholder={nameModal == 'Sản Phẩm'
                            ? 'Ex: Cafe, Latte, ...'
                            : 'Ex: Ngoài sân, Trong nhà, ...'}
                    ></input>
                </div>
                {nameModal == 'Sản Phẩm' ?
                    <div className='modal_input_price'>
                        <div>Giá</div>
                        <input
                            type='number'
                            onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                            value={priceItem}
                            onChange={(event) => { setPriceItem(event.target.value) }}
                            placeholder='Ex: 10000, 120000, ...'
                        ></input>
                    </div>
                    : null
                }
                <div className='modal_btn_add'>
                    <button
                        onClick={nameModal == 'Sản Phẩm' ? handleAddProduct : handleAddPlace}
                    >
                        Thêm {nameModal}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ModalInput;