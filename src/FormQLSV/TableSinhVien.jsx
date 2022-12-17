import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableSinhVien extends Component {

    renderSinhvien = () => {
        let mangSVRender = this.props.mangSVSearch.length ? this.props.mangSVSearch : this.props.mangSV
        return mangSVRender.map((sv, index) => {
            return (
                <tr key={index}>
                    <td>{sv.maSV}</td>
                    <td>{sv.hoTen}</td>
                    <td>{sv.sdt}</td>
                    <td>{sv.email}</td>
                    <td>
                        <button onClick={() => {
                            let action = {
                                type: "XEM_SV",
                                svDetail: sv
                            }
                            this.props.dispatch(action);
                        }} className='btn btn-info mr-3'>Xem</button>
                        <button onClick={() => {
                            let action = {
                                type: "XOA_SV",
                                maSV: sv.maSV
                            }
                            this.props.dispatch(action);
                        }} className='btn btn-danger'>Xóa</button>
                    </td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div className='mt-3'>
                <form onChange={(event) => {
                    let action = {
                        type: "TIM_KIEM_SV",
                        keySearch: event.target.value
                    };
                    this.props.dispatch(action);
                }} style={{marginLeft:"35%"}} className="form-inline mb-3">
                    <input className="form-control mr-sm-2 btn-outline-info " type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
                </form>
                <table className="table">
                    <thead>
                        <tr className='bg-dark text-white'>
                            <th>Mã sinh viên</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSinhvien()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (rootReducer) => {
    return {
        mangSV: rootReducer.QLSVReducer.mangSV,
        mangSVSearch: rootReducer.QLSVReducer.mangSVTK,
    }
}

export default connect(mapStateToProps)(TableSinhVien);