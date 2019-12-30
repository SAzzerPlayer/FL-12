// Your code goes here
let email = prompt('Please, input your email:','');
if(email.length===0){
    alert('Canceled');
} else if(email.length < 5){
    alert("I don't know any emails having name length less than 5 symbols")
} else if(email === 'user@gmail.com' || email === 'admin@gmail.com'){
    let password = prompt('Please, input your password','');
    if(password.length === 0){
        alert('Canceled');
    }
    if(email === 'user@gmail.com' && password === 'UserPass' ||
        email === 'admin@gmail.com' && password === 'AdminPass'){
        if(confirm('Do you want to change your password?')){
            let oldPassword = prompt('Please, input your old password:','');
            if(oldPassword.length === 0){
                alert('Canceled');
            } else if(oldPassword === password){
                let newPassword = prompt('Please, input your new password:','');
                if(newPassword.length === 0){
                    alert('Canceled');
                } else if(newPassword.length < 6){
                    alert('It’s too short password. Sorry.');
                } else{
                    let newRePassword = prompt('Please, input your new password again:','');
                    if(newRePassword === newPassword){
                        alert('You have successfully changed your password.');
                    } else{
                        alert('You wrote the wrong password.')
                    }
                }
            } else{
                alert('Wrong password');
            }
        } else{
            alert('You have failed the change.');
        }
    } else{
        alert('Wrong password');
    }
} else{
    alert("I don't know you");
}