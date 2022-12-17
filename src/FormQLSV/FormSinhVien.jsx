import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class FormSinhVien extends Component {

    state = {
        values: {
            maSV: "",
            hoTen: "",
            sdt: "",
            email: "",
        },
          errors: {
            maSV: "",
            hoTen: "",
            sdt: "",
            email: "",
        }
    }

    inputChange = (event) => {
        let { value, name } = event.target;

        let newValues = { ...this.state.values, [name]: value }
        let newErrors = { ...this.state.errors }
        let errorMessage = "";

        let typeValue = event.target.getAttribute("typeinput");
        if (typeValue === "email") {
            let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

            if (!regex.test(value)) {
                errorMessage = "Định dạng không đúng";
            }
        } else if (typeValue === "sdt") {
            let regex = /^[0-9]+$/;
            if (!regex.test(value)) {
                errorMessage = "Định dạng không đúng";
            }
        } else if (typeValue === "maSV") {
            let flag = false;
            flag = this.props.mangSV.some((sv) => {
                return sv.maSV === value.replaceAll(" ", "");
            })
            if (flag) {
                errorMessage = "Mã sinh viên đã tồn tại"
            }
        }
        if (value.trim() === "") {
            errorMessage = "Thông tin không được để trống";
        }
        newErrors[name] = errorMessage;

        this.setState({
            values: newValues,
            errors: newErrors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let isValid = true;

        for (const key in this.state.errors) {
            if (this.state.errors[key] !== "") {
                console.log(this.state.errors[key])
                isValid = false;
                break;
            }
        }
        
        for (const key in this.state.values) {
            if (this.state.values[key] === "") {
                console.log(this.state.values[key])
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Dữ liệu chưa hợp lệ, vui lòng thử lại!',
            });
            return;
        }
   
        let action = {
            type: "THEM_SV",
            sinhVien: this.state.values,
        }
        this.props.dispatch(action);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            values: newProps.chiTietSV
        })
    }

    render() {
        let {maSV, hoTen,sdt,email} = this.state.values;
        return (
            <div>
                <h3 className='bg-dark text-white p-2 mt-5'>Thông tin sinh viên</h3>
                <form id="formSV" onSubmit={(event) => {
                    this.handleSubmit(event);
                }}>
                    <div className="row">
                        <div className='form-group col-6'>
                            <label>Mã số</label>
                            <input onChange={(event) => {
                                this.inputChange(event)
                            }} id="maSV" value={maSV} typeinput="maSV" name="maSV" type="text" className='form-control' />
                            <span className='text-danger'>{this.state.errors.maSV}</span>
                        </div>
                        <div className='form-group col-6'>
                            <label>Họ tên</label>
                            <input onChange={(event) => {
                                this.inputChange(event)
                            }} value={hoTen} name="hoTen" type="text" className='form-control' />
                            <span className='text-danger'>{this.state.errors.hoTen}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className='form-group col-6'>
                            <label>Số điện thoại</label>
                            <input onChange={(event) => {
                                this.inputChange(event)
                            }} value={sdt} typeinput="sdt" name="sdt" type="text" className='form-control' />
                            <span className='text-danger'>{this.state.errors.sdt}</span>
                        </div>
                        <div className='form-group col-6'>
                            <label>Email</label>
                            <input onChange={(event) => {
                                this.inputChange(event)
                            }} value={email} typeinput="email" name="email" type="text" className='form-control' />
                            <span className='text-danger'>{this.state.errors.email}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-12 text-right'>
                            <button onClick={() => {
                                let action = {
                                    type: "CAP_NHAT_SV",
                                    svUpdate: this.state.values
                                }
                                this.props.dispatch(action);
                            }} id="btnUpdate" type='button' className='btn btn-info mr-3 update'>Cập nhật</button>
                            <button onSubmit={(event) => {
                                this.handleSubmit(event);
                            }} id="btnAddSV" className='btn btn-success'>Thêm sinh viên</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (rootReducer) => {
    return {
        mangSV: rootReducer.QLSVReducer.mangSV,
        chiTietSV: rootReducer.QLSVReducer.chiTietSV
    }
}

export default connect(mapStateToProps)(FormSinhVien);