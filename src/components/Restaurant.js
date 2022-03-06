import { memo } from "react";

const Restaurant = (props) => {
    const {
        khuVuc,
        Ban,
        tatCaCTBan,
        idBanSelected,
        setBanSelected,
        setidBanSelected,
        setphanCapSelected,
        LayCTBan
    } = props
    return (
        <div>
            {khuVuc.map((e, i) => {
                return (
                    <div key={i} className='home_table_par'>
                        <div className='home_table_area'>
                            <div className='home_table_area_title'>{e.tenkhuvuc}</div>
                            <div className='home_table_area_noti'>{i} còn trống</div>
                        </div>
                        <div className='home_table_table_par'>
                            {Ban.map((itemB, i) => {
                                var tongTienCT = 0;
                                tatCaCTBan.map((itemCT, i) => {
                                    if (itemCT.idban == itemB.idban) {
                                        Number.parseInt(tongTienCT += itemCT.giaSanPham * itemCT.soluong);
                                    }
                                })
                                tongTienCT = (tongTienCT).toLocaleString(
                                    undefined,
                                    { minimumFractionDigits: 0 }
                                )
                                var backgroundColor = 'rgb(21, 136, 252)';
                                if (itemB.idban == idBanSelected) {
                                    backgroundColor = 'green'
                                }
                                else if (tongTienCT != 0) {
                                    backgroundColor = 'tomato'
                                }
                                if (itemB.khuvuc == e.tenkhuvuc) {
                                    const TT = ((i + 1) * 100000).toLocaleString(
                                        undefined,
                                        { minimumFractionDigits: 0 }
                                    );
                                    return (
                                        <button key={i} style={{ backgroundColor: backgroundColor }}
                                            onClick={() => {
                                                setBanSelected(itemB.tenBan);
                                                setidBanSelected(itemB.idban);
                                                setphanCapSelected('A');
                                                LayCTBan(itemB.idban, 'A');
                                            }}
                                            className='home_table_table'>
                                            <div className='home_table_table_name'>
                                                {itemB.tenBan}
                                            </div>
                                            <div className='home_table_table_time'>
                                                {tongTienCT > 0 ? '1 phút' : '0 phút'} 
                                            </div>
                                            <div className='home_table_table_money'>
                                                {tongTienCT}
                                            </div>
                                        </button>
                                    );
                                }

                            }
                            )}
                        </div>
                    </div>
                );
            }
            )}
        </div>
    );
}
export default memo(Restaurant) ;