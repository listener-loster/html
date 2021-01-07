<template>
    <div id="wrapper">
    	<section class="page-header page-header-xs">
    		<div class="container">

    			<h1>个人中心</h1>

    			<!-- breadcrumbs -->
    			<ol class="breadcrumb">
    				<li><a href="${root}/pc/index">首页</a></li>
    				<li>个人中心</li>
    				<li class="active">我的订单</li>
    			</ol>
    			<!-- /breadcrumbs -->

    			<!-- page tabs -->
    			<ul class="page-header-tabs list-inline">
    				<li><a href="${root}/pc/account/order/list">我的订单</a></li>
    				<li class="active"><a href="${root}/pc/account/contact/list">常用联系人</a></li>
    				<li><a href="${root}/pc/account/wishlist/page/1">我的收藏</a></li>
    				<li><a href="${root}/pc/account/user_setting">个人设置</a></li>
    				<li><a href="${root}/pc/account/ewallet">充值</a></li>
    			</ul>
    			<!-- /page tabs -->
    		</div>
    	</section>
    	<section>
    		<div class="container">

    			<div class="panel panel-default">
    				<div class="panel-heading">
    					<h2 class="panel-title">常用联系人</h2>
    				</div>


    				<table class="table margin-top-20">
    					<thead>
    						<tr>
    							<th>默认联系人</th>
    							<th>联系人姓名</th>
    							<th>联系人电话</th>
    							<th>联系人地址</th>
    							<th>操作</th>
    						</tr>
    					</thead>
    					<tbody>
    					   <template v-if="UserHots.data && UserHots.data.length>0">
                    <tr v-for="item in UserHots.data">
                      <td v-if="item.contactFlag==1"><input type="radio" name="contect" v-bind:value="item.id" checked="checked" /></td>
                      <td v-if="item.contactFlag!=1"><input type="radio" name="contect" v-bind:value="item.id" /></td>
                      <td v-model="username">{{item.name}}</td>
                      <td v-model="usermobile" >{{item.mobile}}</td>
                      <td v-model="useraddress">{{item.address}}</td>
                      <td><a v-bind:zid="item.id" @click="upDate(item.id,item.name,item.mobile,item.address)">编辑</a>
                        <a v-bind:zid="item.id" @click="delAddress(item.id)">删除</a></td>
                    </tr>
                  </template>
    					</tbody>
    				</table>
    				<form id="perform" method="post"
    					action="/pc/contect/add">
    					<div class="panel-body">
    						<fieldset class="margin-top-10 ">
    							<div class="row">
    								<div class="col-md-6 col-sm-6">
    									<input type="hidden" name="id">
    									<label for="billing_firstname">姓名 *<input
    										id="billing_firstname" name="username" type="text"
    										class="form-control required"  v-model="username"  maxlength="50"></label>
    										<div class="erro"></div>
    								</div>
    								<div class="col-md-6 col-sm-6">
    									<label for="billing_lastname">电话 *<input
    										id="billing_lastname" name="mobile" type="text"
    										class="form-control required" v-model="usermobile" maxlength="11"></label>
    										<div class="erro"></div>
    								</div>
    							</div>


    							<div class="row">
    								<div class="col-lg-12">
    									<label for="billing_address1">地址 *<input
    										id="billing_address1" name="address" type="text"
    										class="form-control required"  v-model="useraddress" maxlength="255"></label>
    										<div class="erro"></div>
    								</div>
    							</div>
    							<button id="save" type="button"
    								class="btn btn-success margin-top-20 pull-right noradius" v-if="flag == false" @click="addDate()">
    								<i class="glyphicon glyphicon-user"></i> 保存联系人
    							</button>
                  <button id="save" type="button"
                  	class="btn btn-success margin-top-20 pull-right noradius" v-if='flag == true' @click="saveupDate()">
                  	<i class="glyphicon glyphicon-user"></i> 保存联系人
                  </button>
    						</fieldset>
    					</div>
    				</form>
    			</div>
    		</div>
    	</section>
    </div>
</template>
<script type="text/javascript">
export default{
  data(){
    return{
      UserHots: [],
      flag:false,
      user:null,
      username:"",
      usermobile:"",
      useraddress:""
    }
  },
  created() {
    this.user=this.Storage.Local.get("User");
    this.userList(this.user.id);
  },
  methods: {
    userList(userId) {
       var req={userId:userId};
       this.$post(this.API.API_URL_CONTACT,req).then(res => {
         if(res.errorCode == 0 && res.data) {
           this.UserHots = res.data;
         }
       })
    },
    delAddress(id){
      var req = {id:id,userId:this.user.id};
      this.$post(this.API.API_URL_USER_REMOVE_CONTECT,req).then(res => {
         if(res.errorCode == 0 ) {
           this.Toastr.success("删除成功！")
           this.userList(req.userId);
         }else{
           this.Toastr.erro("删除失败！")
         }
      })
    },
    upDate(id,name,mobile,address){
      this.flag=true;
      this.id = id;
      this.username = name;
      this.usermobile = mobile;
      this.useraddress = address;
    },
    saveupDate(){
      if(this.username == ''){
        this.Toastr.erro("用户名不能为空！");
      }
      else if(this.usermobile == ''){
        this.Toastr.erro("用户名不能为空！");
      }
      else if(this.usersaddress == ''){
        alert:"address can't null";
      }
      else if(this.usermobile.length != 11){
        alert:"plaese input true nmuber";
      }
      else{
        console.info(this.name,this.mobile,this.address);
        var req={userId:userId,id:this.id,name:this.name,mobile:this.mobile,contactFlag:0,address:this.address};
        this.$post(this.API.API_URL_USER_UPDATE_CONTECT,req).then(res => {

         if(res.errorCode == 0 && res.data) {
           this.Toastr.success("修改成功！")
           this.userList(req.userId);
         }
       })
      }
    },
    addDate(){
      var req={userId:this.user.id,name:this.username, mobile:this.usermobile, address:this.useraddress};
      this.$post(this.API.API_URL_USER_ADD_CONTECT,req).then(res => {
         if(res.errorCode == 0 && res.data) {
           this.Toastr.success("添加成功！")
           this.userList(req.userId);
         }
       })
    },
  },
}
</script>
<style>

</style>
