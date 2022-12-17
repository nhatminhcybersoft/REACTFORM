const initialState = {
    mangSV: [{maSV: "SV001", hoTen: "Nguyễn Văn A", sdt: "090000001", email: "email1@gmail.com"},
    {maSV: "SV002", hoTen: "Trần Văn B", sdt: "090000002", email: "email2@gmail.com"},
    {maSV: "SV003", hoTen: "Bùi Xuân C", sdt: "090000003", email: "email3@gmail.com"}
  ],
    chiTietSV:{maSV: "", hoTen: "", sdt: "", email: "" },
    mangSVTK:[]
  }
  
  export const QLSVReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case "THEM_SV":
        state.mangSV = [...state.mangSV,action.sinhVien]
        return { ...state }
  
      case "XEM_SV":
        document.getElementById("maSV").setAttribute("disabled", true) 
        document.getElementById("btnUpdate").classList.remove("update") 
        document.getElementById("btnAddSV").style.display = "none" 
        state.chiTietSV = action.svDetail
        return {...state}
  
      case "XOA_SV":
        state.mangSV = state.mangSV.filter(sv => sv.maSV !== action.maSV);
        return {...state}
  
      case "CAP_NHAT_SV":
        let svIndex = state.mangSV.findIndex(sv => sv.maSV === action.svUpdate.maSV)
        if (svIndex !== -1) {
          state.mangSV[svIndex] = action.svUpdate;
        }
        state.mangSV = [...state.mangSV]
        state.chiTietSV = action.svUpdate;
        return {...state}
  
      case "TIM_KIEM_SV":
        if (action.keySearch) {
            let searchName = state.mangSV.filter((sv) => {
              return sv.hoTen.toLocaleLowerCase().includes((action.keySearch).toLocaleLowerCase().trim());
            })
            state.mangSVTK = searchName;
        } else {
            state.mangSVTK = []
        }
        return {...state}
      default: {
        return { ...state }
      }
        
    }
  }
  
  