///////////////////////////////////////////////////////////////////////////////////////
// 동적 페이지 구현

// select
const selectOpenClose = (li) => {
  let selectBtn = document.querySelector(li + " button.select");
  let option = document.querySelector(li + " .option");
  if (!selectBtn.classList.contains("open")) {
    selectBtn.classList.add("open");
    option.classList.add("openOption");
  } else {
    selectBtn.classList.remove("open");
    option.classList.remove("openOption");
  }
};
// 대상 이외 부분 클릭시
function clickBodyEventNationality(event) {
  if (document.querySelector("#selectBtn").classList.contains("open")) {
    var target = event.target;
    if (
      !document.querySelector("#selectBtn").contains(target) &&
      !document.querySelector("#option").contains(target)
    ) {
      document.querySelector("#selectBtn").classList.remove("open");
      document.querySelector("#option").classList.remove("openOption");
    }
  }
}
$(document).on("click", ".nationalityArea button.select", function () {
  selectOpenClose(".nationalityArea");
});
window.addEventListener("click", clickBodyEventNationality);
$(".nationalityArea .optionList").click((e) => {
  let changeVal = e.currentTarget.innerText;
  $("#select").val(changeVal).prop("selected", true);
  $("#selectBtn").text(changeVal);
  document.querySelector("#selectBtn").classList.remove("open");
  document.querySelector("#option").classList.remove("openOption");
});

// 썸네일
$("#thum").on("change", function () {
  $("#viewInput").val($("#thum").val());
});
///////////////////////////////////////////////////////////////////////////////////////
// ajax

// 썸네일 유효성 검사
let regex = new RegExp("(.*?)\.(jpg|png|gif|jepg)");

function checkExtension(fileName, fileSize){
  if(!regex.test(fileName)){
    alert("업로드 할 수 없는 파일의 형식입니다.");
    return false;
  }

  if(fileSize >= 5242880){
    alert("파일 사이즈 초과");
    return false;
  }

  return true;
}

// 썸네일 업로드
$("#thum").on("change", function(e){
  let formData = new FormData();
  let inputFile = $("input[name='thum']");
  let files = inputFile[0].files;
  for(let i=0; i<files.length; i++){
    if(!checkExtension(files[i].name, files[i].size)){
      $("#thum").val("");
      $("#viewInput").val("");
      return;
    }
    formData.append("uploadFile", files[i]);
  }
  //
  // $.ajax({
  //   url: "uploadAjaxAction",
  //   type: "post",
  //   data: formData,
  //   contentType: false,
  //   processData: false,
  //   success: function(files){
  //     // showUploadResult(files);
  //   }
  // });
});

///////////////////////////////////////////////////////////////////////////////////////
// 썸머노트

//이미지 등록처리
function imageUpload(files, editor) {
  var status = false;
  var reg = /(.*?)\.(gif|jpg|png|jpeg)$/; //허용할 확장자
  var formData = new FormData();
  var fileArr = Array.prototype.slice.call(files);
  var filename = "";
  var noImgCnt = 0;
  fileArr.forEach(function(f){
    filename = f.name;
    if(filename.match(reg)) {
      formData.append('file[]', f);
    }
    else{
      noImgCnt++;
    }
  });
  // formData.append('tempFolder', $('#tempFolder').val());

  if(noImgCnt > 0) {
    alert("파일은 gif, png, jpg, jpeg 파일만 등록해 주세요.");
    return;
  } else {
    $.ajax({
      url : "이미지 업로드 처리할 주소",
      data:formData,
      cache:false,
      contentType:false,
      processData:false,
      enctype:'multipart/formDataData',
      type:'POST',
      success:function(result) {
        var data = JSON.parse(result); // result = 업로드하고 난 files의 경로
        for(x = 0; x < data.length; x++) {
          var img = $('<img>').attr({src:data[x]});
          $(editor).summernote('insertNode', img[x]); // 썸머노트 컨텐츠에 파라미터로 받은 문자열 추가
        }
      }
    });
  }
}

// test용
$(document).on('click', '#uploadBtn', function (files, editor) {
  saveContent();
});


$(".optionList").click(function (e) {
  e.preventDefault();
  $("input[name=bcate]").attr('value', $(this).attr('id'));
  console.log($("input[name=bcate]").val());
})


const saveContent = () => {
  var summernoteContent = $('#summernote').summernote('code'); // 썸머노트 작성내용(html)
  $("input[name='content']").val(summernoteContent);
  console.log("summernoteContent : " + summernoteContent);
  console.log(typeof(summernoteContent));



  if(confirm("글을 등록하시겠습니까?")) {
    $("form#registerForm").submit();
  }
}






