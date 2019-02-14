$(document).ready(function () {
    var titleCourse=document.getElementById('input-titleCourse');
    var submitCourse=document.getElementsByClassName('submitCourse')[0];
    var descriptionCourse=document.getElementsByClassName('descriptionCourse')[0];
    var fileCourse=document.getElementById('fileCourse').files;
    console.log(fileCourse);
    var titleLab=document.getElementById('input-titleLab');
    var submitLab=document.getElementsByClassName('submitLab')[0];
    var descriptionLab=document.getElementsByClassName('descriptionLab')[0];
    var fileLab=document.getElementById('fileLab').files;

    submitCourse.onclick = event => {
        var nameCourse=document.createElement('p');
        nameCourse.classList='nameCourse';
        nameCourse.innerText=titleCourse.value;
        document.getElementsByClassName('curs')[0].appendChild(nameCourse);

        var courseDescription=document.createElement('p');
        courseDescription.classList='description';
        courseDescription.innerText=descriptionCourse.value;
        document.getElementsByClassName('curs')[0].appendChild(courseDescription);

        var a=document.createElement('a');
        a.files=fileCourse;
        a.href = "";
        a.classList='pdf'
        if(a.files!=undefined)
            a.innerText="Download pdf";
        console.log(a.files);
        document.getElementsByClassName('curs')[0].appendChild(a);
    }
        submitLab.onclick = event => {
            var nameLab=document.createElement('p');
            nameLab.classList='nameLab';
            nameLab.innerText=titleLab.value;
            document.getElementsByClassName('lab')[0].appendChild(nameLab);
    
            var labDescription=document.createElement('p');
            labDescription.classList='description';
            labDescription.innerText=descriptionLab.value;
            document.getElementsByClassName('lab')[0].appendChild(labDescription);
    
            var a=document.createElement('a');
            a.files=fileLab;
            console.log(a.files);
            a.href = "";
            a.classList='pdf'
            if(a.files!=undefined)
                a.innerText="Download pdf";
            console.log(a.files);
            document.getElementsByClassName('lab')[0].appendChild(a);
        }
});