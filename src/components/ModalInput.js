import { useState } from 'react';
import '../css/ModalInput.css'
import close_menu from '../images/close_menu.png'
const ModalInput = (props) => {
    const { nameModal, setHandleModal } = props;
    const [nameItem, setNameItem] = useState();
    const [priceItem, setPriceItem] = useState();

    const handleAddPlace = () => {
        alert(nameItem)
    };
    const handleAddProduct = () => {
        alert(nameItem + '-' + priceItem)
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
                            onKeyDown={(e) =>["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} 
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