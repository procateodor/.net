$(document).ready(function () {
    var title=document.getElementById('input-title');
    var submit=document.getElementsByClassName('submit')[0];
    var description=document.getElementsByClassName('description-course')[0];
    var file=document.getElementById('file').files;
    submit.onclick = event => {
        var name=document.createElement('p');
        name.classList='name';
        name.innerText=title.value;
        document.getElementsByClassName('curs1')[0].appendChild(name);

        var courseDescription=document.createElement('p');
        courseDescription.classList='description';
        courseDescription.innerText=description.value;
        document.getElementsByClassName('curs1')[0].appendChild(courseDescription);

        var a=document.createElement('a');
        a.files=file;
        a.href = "";
        a.classList='pdf'
        a.innerText="Download pdf";
        document.getElementsByClassName('curs1')[0].appendChild(a);
        }
});