#Chị @Hoài sửa lại cái này,
	https://snack.expo.io/@nghichcode/loginlib
thay forgot pass thành Register! Nhập vào user, gmail, pass giống như bản html

#Cấu trúc login lib
	App.js
	components
		ForgotPassword.js [done]
		Register.js
		UpdateProfile.js
		SendActiveEmail.js
	...

#Quy tắc:
	Tối ưu số dòng
		WRONG:
	        document.getElementById('user-para').innerHTML ="Email:"+user.email
														     +"<br>ID:"+user.uid
														     +"<br>Name:"+user.displayName
														     +"<br>PhotoUrl:"+user.photoURL
														     +"<br>Time:"+time+"ms";
     	CORECT
        document.getElementById('user-para').innerHTML ="Email:"+user.email
         +"<br>ID:"+user.uid+"<br>Name:"+user.displayName+"<br>PhotoUrl:"+user.photoURL+"<br>Time:"+time+"ms";