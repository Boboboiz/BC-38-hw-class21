var staffList = [];

var mode = "create";
function checkMode() {
  if (mode === "create") createStaff();
  if (mode === "update") updateStaff();
}

function createStaff() {
  // Dom lấy input

  var id = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var dow = document.getElementById("datepicker").value;
  var salary = document.getElementById("luongCB").value;
  var positon = document.getElementById("chucvu").value;
  var hourOfWork = document.getElementById("gioLam").value;
  var pass = document.getElementById("password").value;
  // check trùng Id

  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].staffId === id)
      return alert("Id đã tồn tại - Vui lòng nhập lại");
  }

  // tạo objec staff

  var staff = new Staff(
    id,
    fullName,
    email,
    pass,
    dow,
    salary,
    positon,
    hourOfWork
  );

  staffList.push(staff);

  console.log(staffList);

  renderHtml();

  saveLocal();
  
}

/** Savelocal */
function saveLocal() {
  var staffListJSOn = JSON.stringify(staffList);
  localStorage.setItem("staff", staffListJSOn);
  console.log(staffListJSOn);
}

/** Get data from local -> parse từ JSON về object (không có method) */
function getLocal() {
  var staffListJSOn = localStorage.getItem("staff");
  if (!staffListJSOn) {
    return [];
  }

  return JSON.parse(staffListJSOn);
}

/** map data từ function getLocal -> thêm phương thức  */
function mapData(local) {
  var mapped = [];

  for (var i = 0; i < local.length; i++) {
    var oldStaff = local[i];
    var newStaff = new Staff(
      oldStaff.staffId,
      oldStaff.staffName,
      oldStaff.staffEmail,
      oldStaff.staffPass,
      oldStaff.staffDow,
      oldStaff.salary,
      oldStaff.positon,
      oldStaff.hourOfWork
    );
    mapped.push(newStaff);
  }
  return mapped;
}
/** In object sau khi map ra html */
function renderHtml(data) {
  data = data || staffList;

  var html = "";
  for (var i = 0; i < data.length; i++) {
    data[i];
    html += `
        <tr>
            <td>${data[i].staffId}</td>
            <td>${data[i].staffName}</td>
            <td>${data[i].staffEmail}</td>
            <td>${data[i].staffDow}</td>
            <td>${data[i].positon}</td>
            <td>${data[i].calcTotalSalary()}</td>
            <td>${data[i].classifiStaff()}</td>
            <td> 
            <button type="button" id="btnUpdate" onclick="getUpdate()"  class="btn btn-light border border-dark" data-target="#myModal" data-toggle="modal"><i class="fa-regular fa-pen-to-square" style="color: #000;"></i></button>   
            <button type="button" onclick="deleteStaff()" class="btn btn-danger border border-dark mt-1  "><i class="fa-solid fa-trash-can" style="color: #000;"></i></button>
            </td>
        </tr>`;
  }

  document.getElementById("tableDanhSach").innerHTML = html;
}

window.onload = function () {
  var staffListFromLocal = getLocal();
  staffList = mapData(staffListFromLocal);

  renderHtml();
};

/** Xóa staff */
function deleteStaff(id) {
  var index = findStaffById(id);

  if (index === -1) return alert("Id không đúng");

  staffList.splice(index, 1);

  renderHtml();

  saveLocal();
}

/**Update thông tin staff */
function getUpdate(id) {
  var index = findStaffById(id);
  if (index === -1) return alert("Id không tồn tại");

  var staff = staffList[index];
  // fill thông tin lên form
  document.getElementById("tknv").value = staff.staffId;
  document.getElementById("name").value = staff.staffName;
  document.getElementById("email").value = staff.staffEmail;
  document.getElementById("datepicker").value = staff.staffDow;
  document.getElementById("luongCB").value = staff.salary;
  document.getElementById("chucvu").value = staff.positon;
  document.getElementById("gioLam").value = staff.hourOfWork;
  document.getElementById("password").value = staff.staffPass;

  // disable input id
  document.getElementById("tknv").disabled = true;

  // đổi mode sang update
  mode = "update";
  document.getElementById("btnThemNV").innerHTML = "Lưu thay đổi";
  document.getElementById("btnThemNV").classList.add("btn", "btn-info");
  document.getElementById("btnDong").classList.add("display");

  // thêm nút lưu thay đổi và nút hủy
  var btnCancel = document.createElement("button");
  btnCancel.type = "button";
  btnCancel.style.borderRadius = "5px";
  btnCancel.style.padding = "5px 10px";
  btnCancel.innerHTML = "Hủy";
  btnCancel.id = "btnCancel";
  btnCancel.classList.add("bnt", "btn-danger");
  btnCancel.onclick = cancelUpdate;
  document.getElementById("modal-footer").appendChild(btnCancel);

}
function updateStaff() {
  // cho user edit form -> save
  // DOM lấy input
  var id = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var dow = document.getElementById("datepicker").value;
  var salary = document.getElementById("luongCB").value;
  var positon = document.getElementById("chucvu").value;
  var hourOfWork = document.getElementById("gioLam").value;
  var pass = document.getElementById("password").value;

  var index = findStaffById(id);
  var staff = staffList[index];
  staff.id = id;
  staff.fullName = fullName;
  staff.email = email;
  staff.dow = dow;
  staff.salary = salary;
  staff.positon = positon;
  staff.hourOfWork = hourOfWork;
  staff.pass = pass;

  renderHtml();
  saveLocal();
  console.log(mode)
  cancelUpdate();
}

function cancelUpdate() {
  mode = "create";
  document.getElementById("btnThemNV").innerHTML = "Thêm người dùng";
  document.getElementById("btnThemNV").classList.remove("btn-info");
  document.getElementById("btnDong").classList.remove("display");
  var btnCancel = document.getElementById("btnCancel");
  btnCancel.remove();
  document.getElementById("tknv").disabled = false;
  document.getElementById("form-cont").reset();
}

/**Find staff theo id  */
function findStaffById(id) {
  // input: id => output: index của staff trong mảng
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].id === id) {
      return i;
    }
  }
  return -1;
}
