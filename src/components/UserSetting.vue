<template>
  <section>
  			<div class="container">

  				<div class="panel panel-default">
  					<div class="panel-heading">
  						<h2 class="panel-title">个人信息设置</h2>
  					</div>

  					<fieldset class="padding-40 ">
  						<div class="row">
  							<h3 class='text-center'>个人信息</h3>
  							<form id="userBasicFrom" onsubmit="return false;">
  								<div class="col-md-6 col-sm-6">
  									<label for="nickName">昵称 </label> <input id="nickName"
  										name="nickName" type="text" v-model="nickname" class="form-control required"
  										value="">
  								</div>

  								<div class="col-md-6 col-sm-6">
  									<label for="email">Email </label> <input id="email" v-model="email" name="email"
  										type="text" class="form-control required"
  										value="">
  								</div>
  							</form>
  						</div>
  						<button id="editBasic"
  							class="btn btn-success margin-top-20 pull-right noradius" @click="changeinfo(nickname,email)">保存</button>
  					</fieldset>

  					<hr />
  					<h3 class='text-center'>修改密码</h3>
  					<fieldset class="padding-40 ">
  						<div class="row">
  							<form id="userPwdFrom" onsubmit="return false;">
  								<div class="col-md-12 col-sm-12">
  									<label for="oldpassword">输入当前密码 </label> <input id="oldpassword"
  										name="oldpassword" type="password" v-model="password"
  										class="form-control required">
  								</div>

  								<div class="col-md-6 col-sm-6">
  									<label for="password">新的密码 </label>
  									<input id="password" name="password" type="password" v-model="newpassword" class="form-control required">
  								</div>

  								<div class="col-md-6 col-sm-6">
  									<label for="rpassword">确认密码 </label> <input id="rpassword"
  										name="rpassword" type="password" v-model="rpassword" class="form-control required">
  								</div>
  							</form>
  						</div>
  						<button id="editPwd" class="btn btn-success margin-top-20 pull-right noradius" @click="changepass(password,newpassword,rpassword)">保存</button>
  					</fieldset>
  				</div>
  			</div>
  		</section>
</template>

<script type="text/javascript">
  export default{
    data(){
      return{
        user:{},
        nickname: "",
        email:"",
        password:"",
        newpassword:"",
        rpassword:""
      }
    },
    created() {
        this.userinfo();
    },
    methods:{
       userinfo(){
         this.user=this.Storage.Local.get("User");
         this.nickname=this.user.nickname;
         this.email=this.user.email;
       },
       changepass(password,rpassword){
         var userId=this.user.id;
         var req = {userId:userId,oldpassword:password,rpassword:rpassword};
         this.$post(this.API.API_URL_USER_CHANGE_PASSWORD,req).then(res => {
           if(res.errorCode == 0 && res.data){
             this.Toastr.success(res.data.message);
           }else{
             this.Toastr.error(res.data.message);
           }
         });
       },
       changeinfo(nickname,email){      
         var vm=this;
         this.user.nickname=nickname;
         this.user.email=email;
         this.$post(this.API.API_URL_USER_CHANGE_INFO,vm.user).then(res => {
           if(res.errorCode == 0 && res.data){
             this.Toastr.success(res.data.message);
             vm.Storage.Local.set("User", vm.user);
             vm.$store.commit("setUser", vm.user);
           }else{
             this.Toastr.error(res.data.message);
           }
         });
       }
    }
  }

	</script>

<style>
</style>
