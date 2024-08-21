// signUp
var userName = document.getElementById('nameInput')
var userEmail = document.getElementById('emailInput')
var userPassword = document.getElementById('passwordInput')
var signUpFill = document.getElementById('signUpFill')
var usersList = [];

var emailInputLogin = document.getElementById('emailInputLogin')
var passInputLogin = document.getElementById('passInputLogin')
var loginFail = document.getElementById('loginFail')
// home
var helloName =  document.getElementById('hello')
var postContent =  document.getElementById('postContent')
var postsList=[]
var updatedIndex;

if(localStorage.getItem('usersList') == null){
    usersList=[]
}else{
    usersList = JSON.parse(localStorage.getItem('usersList'))
}

if(localStorage.getItem('postsList') == null){
    postsList=[]
}else{
    postsList = JSON.parse(localStorage.getItem('postsList'))
    display()
}

// registration
function signUp(){

    if(userName.value == '' || userEmail.value == '' || userPassword.value == ''){
        signUpFill.classList.replace('d-none','d-block')
    }else{
        signUpFill.classList.replace('d-block','d-none')
        var user = {
            name:userName.value,
            email:userEmail.value,
            password:userPassword.value
        }
        usersList.push(user)
        localStorage.setItem('usersList',JSON.stringify(usersList))
        console.log(usersList);
        clearSignUp()
        location.replace('login.html')
    }
}
function clearSignUp(){
    userName.value=''
    userEmail.value=''
    userPassword.value=''
}
function login(){
  for(var i = 0 ; i<usersList.length ; i++){
    if(emailInputLogin.value == usersList[i].email && passInputLogin.value == usersList[i].password){
        loginFail.classList.replace('d-block','d-none')
        localStorage.setItem('userName',usersList[i].name)
        location.replace('home.html')
    }else{
        loginFail.classList.replace('d-none','d-block')
    }
  }
}
function Welcome(){
    helloName.innerHTML='Hello '+ localStorage.getItem('userName')
}






// post
function createPost(){
    var post={
        author:localStorage.getItem('userName'),
        content:postContent.value
    }
    postsList.push(post)
    localStorage.setItem('postsList',JSON.stringify(postsList))
    console.log(postsList);
    display()
}

function display(){
    var cartona=''
    for(var i = 0 ; i<postsList.length ; i++){
        cartona+=`
        <div class="card bg-white w-50 p-4 mb-4 position-relative">
        <div class="icons position-absolute top-0 end-0 m-3">
          <i class="fa-solid fa-trash text-danger mx-2 icon" onclick="deletePost(${i})"></i>
          <i class="fa-solid fa-pen text-warning icon" onclick='kobry(${i})'></i>
        </div>
        <h4>${postsList[i].author}</h4>
        <p>${postsList[i].content}</p>
        </div>
        `
    }

    document.getElementById('posts').innerHTML = cartona
}

function deletePost(index){
    postsList.splice(index,1)
    localStorage.setItem('postsList',JSON.stringify(postsList))
    display()
}

function kobry(index){
    postContent.value = postsList[index].content
    document.getElementById('addButton').classList.replace('d-block','d-none')
    document.getElementById('updateButton').classList.replace('d-none','d-block')
    updatedIndex = index
}

function updatePost(){
    postsList[updatedIndex].content = postContent.value
    localStorage.setItem('postsList',JSON.stringify(postsList))
    display()
    document.getElementById('updateButton').classList.replace('d-block','d-none')
    document.getElementById('addButton').classList.replace('d-none','d-block')
    clearPostInput()
}

function clearPostInput(){
    postContent.value=''
}