<template>
	<section>
		<div class="container">
			<!-- 如果购物车为空 -->
			<div v-show="cartdata.orderItemList==null || cartdata.orderItemList.length==0" class="panel panel-default" style="display: none">
				<div class="panel-body">
					<strong style="font-size: 25px">购物车里无商品!</strong> <br> 随便看看，优惠多多，赶紧抢购吧！
				</div>
			</div>
			<!-- /EMPTY CART -->
			<!-- CART -->
			<div  class="row">
				<!-- LEFT -->
				<div class="col-lg-9 col-sm-8">
					<!-- CART -->
					<form class="cartContent clearfix" method="post" action="#">
						<input type="hidden" name="orderNum" value="O2020102700005">
						<!-- cart content -->
						<div id="cartContent">
							<!-- cart header -->
							<div class="item head clearfix">
								<span class="cart_img"></span> <span class="product_name size-13 bold">产品名称</span> <span class="remove_item size-13 bold"></span> <span class="total_price size-13 bold">合计价格</span> <span class="qty size-13 bold">数量</span>
							</div>
							<!-- /cart header -->

							<div class="item" v-for="item in cartdata.orderItemList">
								<div class="cart_img pull-left width-100 padding-10 text-left">
									<img :src="API.BASE_SERVER_URL+item.productList[0].defaultImg" alt="" width="40">
								</div>
								<a href="shop-single-left.html" class="product_name"> <span>
												{{item.productList[0].name}}</span> <small></small>
								</a>
								<div name="total_price" class="total_price">
									$<span>{{item.quantity*item.price/100}}</span>

								</div>
								<div class="qty">
									<p class="zq" zid="I2020102700007" zpid="935" sku="" group="">{{item.quantity}}</p>
									×{{item.price/100}}
								</div>
								<div class="clearfix"></div>
							</div>

							<div class="padding-20">
								<strong style="font-size: 20px">选择常用联系人</strong>
								<hr>

								<div class="padding-bottom-10" v-for="item in contectdata.data">
									<input type="radio" :value="item.id" v-model="contectId"> 姓名：{{item.name}} &nbsp;&nbsp; 联系电话：{{item.mobile}} &nbsp;&nbsp; 地址：{{item.address}}
								</div>

								<!--<div class="padding-bottom-10">

									<input type="radio" name="product-review-vote" value="79" checked="checked"> 姓名：test &nbsp;&nbsp; 联系电话：18476680307 &nbsp;&nbsp; 地址：xxx
								</div>-->

								<!-- 联系人 -->
							</div>

							<div class="padding-20">
								<strong style="font-size: 20px">请选择支付方式</strong>
								<hr>
								<div>
									<a @click="pay(1)" href="javascript:void(0);"><img src="../../../static/pc_wxqrpay.png"></a>
									<a @click="pay(2)" href="javascript:void(0);"><img src="../../../static/alipaypcnew.png"></a>
									<a @click="pay(2)" href="javascript:void(0);">电子钱包</a>
								</div>
							</div>
							<div class="clearfix"></div>
						</div>
						<!-- /cart content -->
					</form>
					<!-- /CART -->
				</div>
				<!-- RIGHT -->
				<div class="col-lg-3 col-sm-4">

				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				cartdata: {},
				contectdata:{},
				contectId:0
			}
		},
		created() {
			this.info();
		},
		methods: {
			info() {
				//获取购物车数据
				var req = {
					userId: this.Storage.Local.get("User").id
				};
				this.$post(this.API.API_URL_CART, req).then(res => {
					if(res.errorCode == 0 && res.data) {
						this.cartdata = res.data;
						console.log(this.cartdata);
					}
				})
				//获取联系人数据
				var req2 = {
					userId: this.Storage.Local.get("User").id
				};
				var that=this;
				this.$post(this.API.API_URL_CONTECT, req2).then(res => {
					if(res.errorCode == 0 && res.data) {
						this.contectdata = res.data;
						console.log(this.contectdata.data);
						this.contectdata.data.forEach(function(v,i){
							if(v.contactFlag){
								that.contectId=v.id
							}
						})
					}
				})

			},
			pay(paytype){
				var req3 = {
					userId: this.Storage.Local.get("User").id,
					orderNum:this.cartdata.orderNum,
					paymentType:paytype,
					contect:{
            contectId:this.contectId
          }
				};
				console.log(req3)
				this.$post(this.API.API_URL_ORDER_PAYMENT, req3).then(res => {
					if(res.errorCode == 0 && res.data) {
						console.log(res.data);
						this.Toastr.success("支付成功！");
            this.$router.push('/');
					}
				})
			}
		}
	}
</script>

<style scoped>
	section {
		display: block;
	}

	a {
		background-color: transparent;
	}

	a:active,
	a:hover {
		outline: 0;
	}

	strong {
		font-weight: 700;
	}

	small {
		font-size: 80%;
	}

	img {
		border: 0;
	}

	hr {
		height: 0;
		-webkit-box-sizing: content-box;
		-moz-box-sizing: content-box;
		box-sizing: content-box;
	}

	input {
		margin: 0;
		font: inherit;
		color: inherit;
	}

	input::-moz-focus-inner {
		padding: 0;
		border: 0;
	}

	input {
		line-height: normal;
	}

	@media print {
		*,
		:after,
		:before {
			color: #000!important;
			text-shadow: none!important;
			background: 0 0!important;
			-webkit-box-shadow: none!important;
			box-shadow: none!important;
		}
		a,
		a:visited {
			text-decoration: underline;
		}
		a[href]:after {
			content: " (" attr(href) ")";
		}
		a[href^="javascript:"]:after {
			content: "";
		}
		img {
			page-break-inside: avoid;
		}
		img {
			max-width: 100%!important;
		}
		p {
			orphans: 3;
			widows: 3;
		}
	}

	* {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	:after,
	:before {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	input {
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}

	a {
		color: #337ab7;
		text-decoration: none;
	}

	a:focus,
	a:hover {
		color: #23527c;
		text-decoration: underline;
	}

	a:focus {
		outline: thin dotted;
		outline: 5px auto -webkit-focus-ring-color;
		outline-offset: -2px;
	}

	img {
		vertical-align: middle;
	}

	hr {
		margin-top: 20px;
		margin-bottom: 20px;
		border: 0;
		border-top: 1px solid #eee;
	}

	p {
		margin: 0 0 10px;
	}

	small {
		font-size: 85%;
	}

	.text-left {
		text-align: left;
	}

	.container {
		padding-right: 15px;
		padding-left: 15px;
		margin-right: auto;
		margin-left: auto;
	}

	@media (min-width:768px) {
		.container {
			width: 750px;
		}
	}

	@media (min-width:992px) {
		.container {
			width: 970px;
		}
	}

	@media (min-width:1200px) {
		.container {
			width: 1170px;
		}
	}

	.row {
		margin-right: -15px;
		margin-left: -15px;
	}

	.col-lg-3,
	.col-lg-9,
	.col-sm-4,
	.col-sm-8 {
		position: relative;
		min-height: 1px;
		padding-right: 15px;
		padding-left: 15px;
	}

	@media (min-width:768px) {
		.col-sm-4,
		.col-sm-8 {
			float: left;
		}
		.col-sm-8 {
			width: 66.66666667%;
		}
		.col-sm-4 {
			width: 33.33333333%;
		}
	}

	@media (min-width:1200px) {
		.col-lg-3,
		.col-lg-9 {
			float: left;
		}
		.col-lg-9 {
			width: 75%;
		}
		.col-lg-3 {
			width: 25%;
		}
	}

	.panel {
		margin-bottom: 20px;
		background-color: #fff;
		border: 1px solid transparent;
		border-radius: 4px;
		-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
		box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
	}

	.panel-body {
		padding: 15px;
	}

	.panel-default {
		border-color: #ddd;
	}

	.clearfix:after,
	.clearfix:before,
	.container:after,
	.container:before,
	.panel-body:after,
	.panel-body:before,
	.row:after,
	.row:before {
		display: table;
		content: " ";
	}

	.clearfix:after,
	.container:after,
	.panel-body:after,
	.row:after {
		clear: both;
	}

	.pull-left {
		float: left!important;
	}

	input::-moz-focus-inner {
		border: 0;
		padding: 0;
	}

	::selection {
		color: #fff;
		text-shadow: none;
		background: #333;
	}

	::-moz-selection {
		color: #fff;
		text-shadow: none;
		background: #333;
	}

	::-webkit-selection {
		color: #fff;
		text-shadow: none;
		background: #333;
	}

	img {
		border: 0;
		vertical-align: top;
	}

	input,
	*:focus {
		outline: none!important;
	}

	img {
		vertical-align: middle;
	}

	p {
		display: block;
		-webkit-margin-before: 0.1em;
		-webkit-margin-after: 0.1em;
		-webkit-margin-start: 0px;
		-webkit-margin-end: 0px;
	}

	a {
		-webkit-transition: all .300s;
		-moz-transition: all .300s;
		-o-transition: all .300s;
		transition: all .300s;
	}

	a,
	a:focus,
	a:hover,
	a:active {
		outline: 0;
		cursor: pointer;
	}

	p,
	form {
		margin-bottom: 30px;
	}

	:active,
	:focus {
		outline: none!important;
	}

	::-webkit-input-placeholder {
		color: #999;
	}

	:-moz-placeholder {
		color: #999;
	}

	::-moz-placeholder {
		color: #999;
	}

	:-ms-input-placeholder {
		color: #999;
	}

	.size-13 {
		font-size: 13px!important;
		line-height: 17px!important;
	}

	.width-100 {
		width: 100px!important;
	}

	.padding-10 {
		padding: 10px!important;
	}

	.padding-20 {
		padding: 20px!important;
	}

	.bold {
		font-weight: bold!important;
	}

	.text-left {
		text-align: left!important;
	}

	hr {
		border: 0;
		height: 1px;
		background-image: -webkit-linear-gradient(left, transparent, rgba(0, 0, 0, 0.2), transparent);
		background-image: -moz-linear-gradient(left, transparent, rgba(0, 0, 0, 0.2), transparent);
		background-image: -ms-linear-gradient(left, transparent, rgba(0, 0, 0, 0.2), transparent);
		background-image: -o-linear-gradient(left, transparent, rgba(0, 0, 0, 0.2), transparent);
		background-image: linear-gradient(left, transparent, rgba(0, 0, 0, 0.2), transparent);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d6d6d6', endColorstr='#d6d6d6', GradientType=0);
	}

	.pull-left {
		float: left;
	}

	.panel {
		margin-bottom: 30px;
	}

	form>input {
		margin-bottom: 8px;
	}

	section {
		display: block;
		position: relative;
		padding: 80px 0;
		border-bottom: rgba(0, 0, 0, 0.1) 1px solid;
		-webkit-transition: all .400s;
		-moz-transition: all .400s;
		-o-transition: all .400s;
		transition: all .400s;
		background-attachment: fixed;
		background-position: center center;
		background-repeat: no-repeat;
		-webkit-background-size: cover!important;
		-moz-background-size: cover!important;
		-o-background-size: cover!important;
		-webkit-box-sizing: border-box!important;
		-moz-box-sizing: border-box!important;
		background-size: cover!important;
		box-sizing: border-box!important;
	}

	section:after,
	section:before {
		content: " ";
		display: table;
	}

	.container {
		position: relative;
	}

	a:active,
	a:focus,
	a:hover {
		color: #212121;
		text-decoration: none;
	}

	small {
		font-family: 'Lato', sans-serif;
	}

	.panel {
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
		border-radius: 3px;
	}

	@media only screen and (max-width: 768px) {
		section div.row>div {
			margin-bottom: 60px;
		}
	}

	.cartContent {
		padding: 0;
	}

	.cartContent .item {
		position: relative;
		background: rgba(0, 0, 0, 0.01);
	}

	.cartContent .item {
		margin-top: -1px;
		border: rgba(0, 0, 0, 0.05) 1px solid;
	}

	.cartContent .item.head {
		border-bottom: 0;
	}

	.cartContent .product_name {
		float: left;
		width: 35%;
		padding: 10px;
		text-decoration: none;
		min-height: 60px;
	}

	.cartContent .product_name:hover>span {
		text-decoration: underline;
	}

	.cartContent .product_name>small {
		display: block;
		font-size: 12px;
		line-height: 12px;
		color: rgba(0, 0, 0, 0.5);
		font-family: 'Open Sans', Arial, Helvetica, sans-serif;
	}

	.cartContent .qty {
		float: right;
		width: 160px;
		font-size: 15px;
		padding: 10px;
		text-align: center;
	}

	.cartContent .total_price {
		float: right;
		width: 150px;
		font-size: 15px;
		padding: 10px;
		line-height: 30px;
		text-align: center;
		font-weight: bold;
	}

	.cartContent .remove_item {
		float: right;
		padding: 5px 5px 5px 7px;
		width: 30px;
		margin-right: 8px;
	}

	@media only screen and (max-width: 992px) {
		.cartContent .item.head {
			display: none;
		}
		.cartContent .product_name {
			font-size: 11px;
			line-height: 15px;
		}
		.cartContent .item .qty {
			float: left;
			text-align: left;
		}
		.cartContent .product_name {
			width: 50%;
		}
	}

	::selection {
		background: #F07057;
	}

	::-moz-selection {
		background: #F07057;
	}

	::-webkit-selection {
		background: #F07057;
	}

	a,
	a:focus:not(.btn) {
		color: #F07057;
	}
</style>
