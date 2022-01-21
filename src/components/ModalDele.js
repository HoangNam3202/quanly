import React from "react";

const ModalDele = (props) => {
    return(
        <div className='home_modal_par'>
          <div className='home_modal'>
            <div className='home_modal_title'>Xoá sản phẩm {props.spXoa} ?</div>
            <div className='home_modal_comment home_modal_table' >{props.BanSelected} , {props.phanCap} </div>
            <div className='home_modal_comment' >Sau khi xoá toàn bộ sản phẩm sẽ mất vĩnh viễn khỏi bàn được chọn. Bạn có đồng ý xóa sản phẩm ?</div>
            <div className='home_modal_btn_par'>
              <button onClick={() => props.setModalDelete(false)} className='home_modal_btn'>Hủy</button>
              <button onClick={()=>props.XoaSPCT()} className='home_modal_btn'>Đồng ý</button>
            </div>
          </div>
        </div>
    );
}

export default ModalDele;