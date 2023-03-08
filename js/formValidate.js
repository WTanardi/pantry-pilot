// const form = document.getElementById('formRegister');
// const pass = document.getElementById('password');

// form.addEventListener('submit', e => {
//     e.preventDefault();
//     validate();
// });

// const setErr = (element, message) => {
//     const inputControl = element.parentElement;
//     const errDisplay = inputControl.querySelector('.err');

//     errDisplay.innerText = message;
//     // inputControl.classList.add('err') :> menambahkan class eror css
// };

// const setSuccess = element => {
//     const inputControl = element.parentElement;
//     const errDisplay = inputControl.querySelector('.err');

//     errDisplay.innerText = '';
// };

// const validate = () => {
//     const passValue = pass.value;

//     if (passValue < 8) {
//         setErr(pass, 'Password at least 4 character');
//     } else {
//         setSuccess(pass);
//     }
// };

// $(document).ready(function () {
//     $("#formRegister").validate({

//         rules: {
//             password: {
//                 required:true,
//                 minlength: 2
//             }
//         },

//         message: {
//             minlength: 'Password at least 4 characters'
//         },

//         submitHandler: function(form) {
//           form.submit();
//         }
//     });
// });