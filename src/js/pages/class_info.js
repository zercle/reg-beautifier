addTitleBar('วิชาที่เปิดสอน', 'Opening Classes', '\uf518');

const lang = getCurrentLanguage();
if (lang === 'th') { // thai
    document.getElementsByName("coursecode")[0].placeholder = "รหัสวิชา";
    document.getElementsByName("coursename")[0].placeholder = "ชื่อวิชา";
} else if (lang === 'en') {
    document.getElementsByName("coursecode")[0].placeholder = "Course code";
    document.getElementsByName("coursename")[0].placeholder = "Course name";
}
