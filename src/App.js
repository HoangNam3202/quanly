import logo from './logo.svg';
import './App.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCookies } from "react-cookie";
import API_URL from './contants/contants';
import home_search from './images/home_search.png';
import home_user from './images/home_user.png'
import home_trash from './images/home_trash.png'
import home_empty_table from './images/home_empty_table.png'

import PlaceApi from './components/PlaceAPI';
import ModalDele from './components/ModalDele';
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['ut']);
  const [total_Tong, setTotalTong] = useState(0);
  const [tendangnhap, setTenDangNhap] = useState();
  const [BanSelected, setBanSelected] = useState();
  const [keywordSearch, setkeywordSearch] = useState();
  const [idBanSelected, setidBanSelected] = useState();
  const [phanCap, setphanCapSelected] = useState();
  const [modal_delete, setModalDelete] = useState(false);
  const [suggest_div, setSuggestDiv] = useState(false);
  const [spXoa, setSpXoa] = useState();

  const [khuVuc, setKhuVuc] = useState([]);
  const [Ban, setBan] = useState([]);
  const [tatCaCTBan, seTatCaCTBan] = useState([]);
  const [chiTietBan, setChiTietBan] = useState([]);
  const [sanPhamSuggest, setSanPhamSuggest] = useState([]);
  const [dataphanCap, setdatapCapSelected] = useState([
    {
      id: '1',
      ten: 'A'
    },
    {
      id: '2',
      ten: 'B'
    },
    {
      id: '3',
      ten: 'C'
    },
    {
      id: '4',
      ten: 'D'
    }
  ]);

  const LayBan = async (tendnprops) => {
    //lay ban theo khu vuc
    await fetch(API_URL + '/bantheokv', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: tendnprops,
        // khuVuc: tenkvprops
      })
    })
      .then(res => res.json())
      .then(data => {
        setBan(data);
      })
  }
  const CapNhatSl = async (idBan, pCap, tenMon, soLuong) => {
    //cap nhat sl san pham theo tung` ban`
    if( soLuong < 0 ){
      alert('Số lượng tối thiểu')
    }
    else{
      await fetch(API_URL + '/capnhatsl', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Username: tendangnhap,
          idBan: idBan,
          phanCap: pCap,
          tenMon: tenMon,
          soLuong: soLuong
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            LayCTBan(idBan, pCap)
            LayTatCaCTBan(tendangnhap)
          }
        })
    }
  }
  const ThemSPCT = async (item) => {
    //them san pham theo tung` ban`
    if (idBanSelected) {
      await fetch(API_URL + '/themSPCT', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Username: tendangnhap,
          idBan: idBanSelected,
          phanCap: phanCap,
          tenMon: item.tensanpham,
          giaSP: item.giaSanPham,
          Dvt: item.donViTinh,
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data) LayCTBan(idBanSelected, phanCap)
          setkeywordSearch('')
          LayTatCaCTBan(tendangnhap)
        })
    }
    else {
      alert('Chọn bàn cần thêm sản phẩm')
    }


  };
  const XoaSPCT = async () => {
    //xoa san pham theo tung` ban`
    await fetch(API_URL + '/xoaSPCT', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: tendangnhap,
        idBan: idBanSelected,
        phanCap: phanCap,
        tenMon: spXoa,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) LayCTBan(idBanSelected, phanCap)
        LayTatCaCTBan(tendangnhap)
        setModalDelete(false)
      })
  };
  const LayTatCaCTBan = async (tendnprops) => {
    //lay tat ca san pham theo tung` ban`
    await fetch(API_URL + '/tatcactban', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: tendnprops
      })
    })
      .then(res => res.json())
      .then(data => {
        seTatCaCTBan(data)
      })

  }
  const LayCTBan = async (idBan, pCap) => {
    //lay san pham theo tung` ban`
    await fetch(API_URL + '/chitietban', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: tendangnhap,
        idBan: idBan,
        phanCap: pCap
      })
    })
      .then(res => res.json())
      .then(data => {
        const CTBANDATA = data;
        if (CTBANDATA != 'empty') {
          setChiTietBan(CTBANDATA);
          var Tong = 0;
          CTBANDATA.forEach((e, i) => {
            const DG = e.giaSanPham;
            const TT = (DG * e.soluong);
            Tong += TT;
            // setTotal_number(Total_number => TT + Total_number);
            const Total = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Tong);
            setTotalTong(Total);
          });
        }
        else {
          setChiTietBan([]);
          const Total_0 = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0);
          setTotalTong(Total_0);
        }
      })

  }
  // const LayKhuVuc = async (tendnprops) => {
  //   //khu vuc
  //   await fetch(API_URL + '/khuvuc', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       Username: tendnprops
  //     })
  //   })
  //     .then(res => res.text())
  //     .then(data => {
  //       setKhuVuc(JSON.parse(data));
  //       // alert(JSON.parse(data)[0].tenkhuvuc)
  //       LayBan(tendnprops)
  //     })
  // }
  useEffect(async () => {
    if (!cookies.ut) window.location.replace('/login')
    else if (cookies.ut) {
      await fetch(API_URL + '/ktdangnhap', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          User_token: cookies.ut,
        })
      })
        .then(res => res.text())
        .then(async (data) => {
          if (data == '"remember_denied"') {
            removeCookie('ut', { path: '/' });
            window.location.replace('/login')
            alert('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.')
          }
          else {
            setTenDangNhap(JSON.parse(data))
            const khuVuc = await PlaceApi.LayKhuVuc(JSON.parse(data));
            setKhuVuc(khuVuc);
            LayBan(JSON.parse(data));
            LayTatCaCTBan(JSON.parse(data));
          }
        })
    }
  }, []);
  useEffect(async () => {
    if (keywordSearch != undefined) {
      await fetch(API_URL + '/search', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Username: '82 Hung Vuong',
          keyword: keywordSearch
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            setSanPhamSuggest(data);
          }
        })
    }
  }, [keywordSearch]);

  const handleFocus = (event) => {
    event.target.select();
    setSuggestDiv(true);
  }
  // const handleMouseEnter = () => setSuggestDiv(false);

  return (
    <div className="App">
      <div className='home_header'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className='home_option_left'>
            <img src={home_search} className='home_search_img' ></img>
            <input onFocus={handleFocus} value={keywordSearch} onChange={(text) => setkeywordSearch(text.target.value)} placeholder='Tìm kiếm sản phẩm' className='home_search_input'></input>
            {keywordSearch && sanPhamSuggest.length > 0 ?
              <div className='home_option_search_suggest'>
                {sanPhamSuggest.map((item, index) => {
                  const giaSP = (item.giaSanPham).toLocaleString(
                    undefined,
                    { minimumFractionDigits: 0 }
                  );
                  return (
                    <button onClick={() => { ThemSPCT(item) }} key={index} className='home_suggest_item'>
                      <div className='home_suggest_name'>{item.tensanpham}</div>
                      <div className='home_suggest_price'>{giaSP}</div>
                    </button>
                  );
                })}
              </div>
              : null}
          </div>
          {BanSelected ?
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div className='home_option_left_table_infor'>{BanSelected}</div>
              {dataphanCap.map((e, i) => {
                var color = 'gray';
                if (e.ten == phanCap) {
                  color = 'red'
                }
                return (
                  <button key={i} style={{ color: color }}
                    onClick={() => {
                      setphanCapSelected(e.ten);
                      LayCTBan(idBanSelected, e.ten);
                    }}
                    className='home_option_left_table_infor btn_ABC' >
                    {e.ten}
                  </button>
                );
              })}
            </div>
            : null}
        </div>
        <div className='home_option_right'>
          <button title='Chi tiết thông tin' className='home_username_par'>
            <div className='home_username_img_par'>
              <img className='home_username_img' src={home_user}></img>
            </div>
            <div className='home_username'>{tendangnhap}</div>
          </button>
          <div>
            <button className='home_btn_logout' onClick={() => {
              removeCookie('ut', { path: '/' });
              window.location.replace('/login');
            }}>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
      <section className='home_body'>
        <div className='home_body_left'>
          <div className='home_body_left_content'>
            <div className='home_content_th'>
              <div className='home_content_th_title'>Tên hàng hóa</div>
              <div className='home_content_th_title'>ĐVT</div>
              <div className='home_content_th_title'>SL</div>
              <div className='home_content_th_title'>Đơn giá</div>
              <div className='home_content_th_title'>Thành tiền</div>
              <div className='home_content_td_title'></div>
            </div>
            {chiTietBan.length > 0 ?
              <div style={{ height: '80%', width: '100%' }}>
                {chiTietBan.map((e, i) => {
                  var backgroundColor = 'white';
                  if (i % 2 == 0) {
                    backgroundColor = 'white'
                  }
                  else {
                    backgroundColor = 'transparent'
                  }
                  const DG = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e.giaSanPham);
                  const TT = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e.giaSanPham * e.soluong);
                  return (
                    <div key={i} className='home_content_td' style={{ backgroundColor: backgroundColor }}>
                      <div className='home_content_td_title'>{e.tensanpham}</div>
                      <div className='home_content_td_title'>{e.DVT}</div>
                      <div className='home_content_td_title'>
                        <div className='home_content_td_quality'>
                          <button onClick={() => { CapNhatSl(e.idban, e.phcap, e.tensanpham, e.soluong - 1) }} className='home_content_btn_quality'>–</button>
                          <input className='home_content_input_quality' value={e.soluong} onChange={(text) => { CapNhatSl(e.idban, e.phcap, e.tensanpham, text.target.value) }}></input>
                          <button onClick={() => { CapNhatSl(e.idban, e.phcap, e.tensanpham, Number.parseInt(e.soluong) + 1) }} className='home_content_btn_quality'>+</button>
                        </div>
                      </div>
                      <div className='home_content_td_title'>{DG}</div>
                      <div className='home_content_td_title'>{TT}</div>
                      <img onClick={() => {
                        setSpXoa(e.tensanpham)
                        setModalDelete(!modal_delete)
                      }}
                        src={home_trash}
                        className='home_content_td_title td_img'>
                      </img>
                    </div>
                  )
                })}
              </div>
              :
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',position:'relative', top:'50%',transform : 'translateY(-50%)' }}>
                <img src={home_empty_table} width='10%'/>
                <div style={{color:'tomato', fontSize:'1.2vw'}}>* Bàn trống *</div>
              </div>
            }

          </div>
          <div className='home_body_left_total'>
            <div className='home_total_title'>Tổng cộng: </div>
            <div className='home_total_price'>{total_Tong}</div>
          </div>
          <div className='home_body_left_option'>
            <div className='home_body_option_sec'>
              <div className='home_body_option'>
                Chuyển bàn
              </div>
              <div className='home_body_option'>
                Tách bàn
              </div>
            </div>
            <div className='home_body_option_sec'>
              <div className='home_body_option'>
                Báo chế biến
              </div>
              <div className='home_body_option'>
                Cái gì đó k thấy
              </div>
            </div>
            <div className='home_body_option_sec'>
              <div className='home_body_option'>
                Thanh toán
              </div>
            </div>
          </div>
        </div>
        <div className='home_body_right'>
          <div className='home_body_right_head'>
            <button className='home_right_head_item'>Phòng - Bàn</button>
            <button className='home_right_head_item'>Thực đơn</button>
          </div>
          <div className='home_body_right_content'>
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
                          <button style={{ backgroundColor: backgroundColor }}
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
                              1 phút
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
        </div>
      </section>
      {modal_delete
        ?
        <ModalDele XoaSPCT={XoaSPCT} spXoa={spXoa} BanSelected={BanSelected} phanCap={phanCap} setModalDelete={setModalDelete}></ModalDele>
        : null
      }
    </div>
  );
}

export default App;
