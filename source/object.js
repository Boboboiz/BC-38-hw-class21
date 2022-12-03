function Staff(id, fullName, email, dow, pass, salary, positon, hourOfWork) {
  this.staffId = id;
  this.staffName = fullName;
  this.staffEmail = email;
  this.staffDow = dow;
  this.staffPass = pass;
  this.salary = salary;
  this.positon = positon;
  this.hourOfWork = hourOfWork;

  this.calcTotalSalary = function () {
    var checkPositon = document.getElementById("chucvu").value;

    var type = 0;
    var totalSalary = 0;
    if (this.positon === "Sếp") {
      type = 1;
    } else if (this.positon === "Trưởng phòng") {
      type = 2;
    } else if (this.positon === "Nhân viên") {
      type = 3;
    } else {
      return alert("Vui lòng chọn chức vụ");
    }
    if (type === 1) {
      totalSalary = this.salary * 3;
    } else if (type === 2) {
      totalSalary = this.salary * 2;
    } else {
      totalSalary = this.salary;
    }
    return totalSalary
  };

  this.classifiStaff = function () {
    var rankStaff = "";

    if (this.hourOfWork < 160) {
      rankStaff = "Nhân viên trung bình";
    } else if (this.hourOfWork >= 160 && this.hourOfWork < 176) {
      rankStaff = "Nhân viên khá ";
    } else if (this.hourOfWork >= 176 && this.hourOfWork < 192) {
      rankStaff = "Nhân viên giỏi";
    } else {
      rankStaff = "Nhân viên xuất sắc";
    }
    return rankStaff
  };
}


