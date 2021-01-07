<template>
	<section>
		<div class="container">
			<!-- 如果购物车为空 -->
			<div v-show="cartdata.orderItemList==null || cartdata.orderItemList.length==0"  id="msgDiv" class="panel panel-default" style="display: none">
				<div class="panel-body">
					<strong style="font-size: 25px">购物车里无商品!</strong><br> 随便看看，优惠多多，赶紧抢购吧！
				</div>
			</div>
			<div class="row">
				<!-- LEFT -->
				<div class="col-lg-9 col-sm-8">
					<!-- CART -->
					<form class="cartContent clearfix" method="post" action="#">
						<!-- cart content -->
						<div id="cartContent">
							<!-- cart header -->

							<div class="item head clearfix">
								<span class="cart_img"></span> <span class="product_name size-13 bold">产品名称</span> <span class="remove_item size-13 bold"></span> <span class="total_price size-13 bold">合计价格</span> <span class="qty size-13 bold">数量</span>
							</div>

							<!-- /cart header -->
              <template v-if="cartdata.orderItemList && cartdata.orderItemList.length>0">
							<div class="item" v-for="item in cartdata.orderItemList">
								<div class="cart_img pull-left width-100 padding-10 text-left">
									<img :src="API.BASE_SERVER_URL+item.productList[0].defaultImg" alt="" width="40">
								</div>
								<a href="/pc/pc/product/935" class="product_name"> <span>
												{{item.productList[0].name}}</span> <small></small>
								</a>
								<a href="javascript:void(0)" name="removeItem" class="remove_item" @click="delitem(item.id)"><i class="fa fa-times"></i></a>
								<div name="total_price" class="total_price">¥<span>{{item.quantity*item.price/100}}</span></div>
								<div class="qty">
									<input type="number" v-model="item.quantity" name="qty" maxlength="3" max="999" min="1"> × ¥{{item.price/100}}
								</div>
								<div class="clearfix"></div>
							</div>
              </template>
							<!--<div class="item">
								<div class="cart_img pull-left width-100 padding-10 text-left">
									<img src="/pc/resources/upload/f55b147033d84497a54fd5c34c75e153.jpg" alt="" width="40">
								</div>
								<a href="/pc/pc/product/944" class="product_name"> <span>
												密园小农 新鲜西兰花 500g  当天采摘蔬菜</span> <small></small>
								</a>
								<a href="javascript:void(0)" name="removeItem" zid="I2020102600003" zprice="28.0" class="remove_item"><i class="fa fa-times"></i></a>
								<div name="total_price" class="total_price">¥<span>28.00</span></div>
								<div class="qty">
									<input type="number" value="1" zprice="28.0" zid="I2020102600003" zpid="944" sku="" group="" name="qty" maxlength="3" max="999" min="1"> × ¥28.00
								</div>
								<div class="clearfix"></div>
							</div>-->

							<button @click="updatecart()" id="updateCart" type="button" class="btn btn-success margin-top-20 pull-right noradius">
										<i class="glyphicon glyphicon-ok"> </i> 更新购物车
									</button>
							<button @click="removeall()" id="removeCart" type="button" class="btn btn-danger margin-top-20 pull-right noradius">
										<i class="glyphicon glyphicon-remove"> </i> 清空购物车
									</button>

							<div class="clearfix"></div>
						</div>

					</form>

				</div>
				<!-- RIGHT -->
				<div class="col-lg-3 col-sm-4">
					<div>
						<div>

							<div class="hideDiv">
								<span class="clearfix"> <span id="sumCart" class="pull-right">
									¥{{cartdata.price/100}}
									</span>
								<strong class="pull-left">商品总价:</strong>
								</span> <span class="clearfix"> <span class="pull-right">包邮</span>
								<span class="pull-left">物流费用:</span>
								</span>
								<hr>
								<span class="clearfix"> <span class="pull-right size-20">
									¥{{cartdata.price/100}}</span>
								<strong class="pull-left">合计金额:</strong>
								</span>
								<hr>
								<button @click="gotopay()" id="payCart" type="button" class="btn btn-success margin-top-20 pull-right noradius">
										<i class="glyphicon glyphicon-ok"> </i> 立即支付
									</button>
							</div>

						</div>
					</div>
				</div>
			</div>

		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				cartdata: {}
			}
		},
		created() {
			this.orderItems();
		},
		methods: {
      orderItems(){
        var req = {
        	userId: this.Storage.Local.get("User").id
        };
        this.$post(this.API.API_URL_CART, req).then(res => {
        	if(res.errorCode == 0 && res.data) {
        		this.cartdata = res.data;
        	}
        })
      },
			delitem(id) {
				var req = {
					userId: this.Storage.Local.get("User").id,
					orderItem: {
						id: id
					}
				};
				this.$post(this.API.API_URL_CART + '/items/remove', req).then(res => {
					if(res.errorCode == 0 && res.data) {
						if(res.data) {
							//window.location.reload();
              console.info(res.data)
              this.orderItems();
						}
					}
				})
			},
			removeall() {
				var req = {
					userId: this.Storage.Local.get("User").id
				};
				this.$post(this.API.API_URL_CART + '/items/removeall', req).then(res => {
					if(res.errorCode == 0) {
              this.cartdata.orderItemList =[];
					}
				})
			},
			updatecart(){
				console.log(this.cartdata.orderItemList)
				var req = {
					userId: this.Storage.Local.get("User").id,
//					orderItemList: [{"id": this.cartdata.orderItemList[0].id,"productId":this.cartdata.orderItemList[0].productId,"quantity": this.cartdata.orderItemList[0].quantity}]
					orderItemList: this.cartdata.orderItemList
				};
				this.$post(this.API.API_URL_CART + '/items/update', req).then(res => {
					if(res.errorCode == 0) {
//							window.location.reload();
						this.Toastr.success("更新成功！");
					}
				})
			},
			gotopay(){
				this.$router.push('/Pay');
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

	button,
	input {
		margin: 0;
		font: inherit;
		color: inherit;
	}

	button {
		overflow: visible;
	}

	button {
		text-transform: none;
	}

	button {
		-webkit-appearance: button;
		cursor: pointer;
	}

	button::-moz-focus-inner,
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
	}

	.glyphicon {
		position: relative;
		top: 1px;
		display: inline-block;
		font-family: 'Glyphicons Halflings';
		font-style: normal;
		font-weight: 400;
		line-height: 1;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.glyphicon-ok:before {
		content: "\e013";
	}

	.glyphicon-remove:before {
		content: "\e014";
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

	button,
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

	.btn {
		display: inline-block;
		padding: 6px 12px;
		margin-bottom: 0;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.42857143;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		-ms-touch-action: manipulation;
		touch-action: manipulation;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		background-image: none;
		border: 1px solid transparent;
		border-radius: 4px;
	}

	.btn:active:focus,
	.btn:focus {
		outline: thin dotted;
		outline: 5px auto -webkit-focus-ring-color;
		outline-offset: -2px;
	}

	.btn:focus,
	.btn:hover {
		color: #333;
		text-decoration: none;
	}

	.btn:active {
		background-image: none;
		outline: 0;
		-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
		box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
	}

	.btn-success {
		color: #fff;
		background-color: #5cb85c;
		border-color: #4cae4c;
	}

	.btn-success:focus {
		color: #fff;
		background-color: #449d44;
		border-color: #255625;
	}

	.btn-success:hover {
		color: #fff;
		background-color: #449d44;
		border-color: #398439;
	}

	.btn-success:active {
		color: #fff;
		background-color: #449d44;
		border-color: #398439;
	}

	.btn-success:active:focus,
	.btn-success:active:hover {
		color: #fff;
		background-color: #398439;
		border-color: #255625;
	}

	.btn-success:active {
		background-image: none;
	}

	.btn-danger {
		color: #fff;
		background-color: #d9534f;
		border-color: #d43f3a;
	}

	.btn-danger:focus {
		color: #fff;
		background-color: #c9302c;
		border-color: #761c19;
	}

	.btn-danger:hover {
		color: #fff;
		background-color: #c9302c;
		border-color: #ac2925;
	}

	.btn-danger:active {
		color: #fff;
		background-color: #c9302c;
		border-color: #ac2925;
	}

	.btn-danger:active:focus,
	.btn-danger:active:hover {
		color: #fff;
		background-color: #ac2925;
		border-color: #761c19;
	}

	.btn-danger:active {
		background-image: none;
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

	.pull-right {
		float: right!important;
	}

	.pull-left {
		float: left!important;
	}

	button::-moz-focus-inner,
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

	button {
		background: none;
		border: 0;
		margin: 0;
		padding: 0;
		cursor: pointer;
	}

	img {
		border: 0;
		vertical-align: top;
	}

	input,
	button,
	*:focus {
		outline: none!important;
	}

	img {
		vertical-align: middle;
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

	form {
		margin-bottom: 30px;
	}

	:active,
	:focus {
		outline: none!important;
	}

	input[type="number"]:focus {
		outline: 0 none;
		-webkit-box-shadow: none!important;
		-moz-box-shadow: none!important;
		-o-box-shadow: none!important;
		box-shadow: none!important;
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

	.size-20 {
		font-size: 20px!important;
		line-height: 26px!important;
	}

	.width-100 {
		width: 100px!important;
	}

	.padding-10 {
		padding: 10px!important;
	}

	.margin-top-20 {
		margin-top: 20px!important;
	}

	.noradius {
		-webkit-border-radius: 0!important;
		-moz-border-radius: 0!important;
		border-radius: 0!important;
	}

	.bold {
		font-weight: bold!important;
	}

	.text-left {
		text-align: left!important;
	}

	.btn>i {
		padding-right: 6px;
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

	button::-moz-focus-inner {
		padding: 0;
		border: 0;
	}

	.fa {
		display: inline-block;
		font: normal normal normal 14px/1 FontAwesome;
		font-size: inherit;
		text-rendering: auto;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.pull-right {
		float: right;
	}

	.pull-left {
		float: left;
	}

	.fa-times:before {
		content: "\f00d";
	}

	.btn.pull-right {
		margin: 5px 0 5px 5px;
	}

	.btn {
		height: 40px;
	}

	.panel {
		margin-bottom: 30px;
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

	.btn {
		position: relative;
	}

	.panel,
	.btn {
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

	.cartContent .qty input {
		padding: 3px;
		margin: 0;
		border: #ccc 1px solid;
		width: 50px;
		margin-right: 3px;
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

	.cartContent a.remove_item {
		background: rgba(0, 0, 0, 0.1);
		border: rgba(0, 0, 0, 0.1) 1px solid;
		padding-top: 0;
		margin-top: 10px;
		height: 30px;
		line-height: 26px;
		font-size: 18px;
		text-decoration: none;
		color: rgba(0, 0, 0, 0.5);
		border-radius: 3px;
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

	button,
	input {
		margin: 0;
		font: inherit;
		color: inherit;
	}

	button {
		overflow: visible;
	}

	button {
		text-transform: none;
	}

	button {
		-webkit-appearance: button;
		cursor: pointer;
	}

	button::-moz-focus-inner,
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
	}

	.glyphicon {
		position: relative;
		top: 1px;
		display: inline-block;
		font-family: 'Glyphicons Halflings';
		font-style: normal;
		font-weight: 400;
		line-height: 1;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.glyphicon-ok:before {
		content: "\e013";
	}

	.glyphicon-remove:before {
		content: "\e014";
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

	button,
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

	.btn {
		display: inline-block;
		padding: 6px 12px;
		margin-bottom: 0;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.42857143;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		-ms-touch-action: manipulation;
		touch-action: manipulation;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		background-image: none;
		border: 1px solid transparent;
		border-radius: 4px;
	}

	.btn:active:focus,
	.btn:focus {
		outline: thin dotted;
		outline: 5px auto -webkit-focus-ring-color;
		outline-offset: -2px;
	}

	.btn:focus,
	.btn:hover {
		color: #333;
		text-decoration: none;
	}

	.btn:active {
		background-image: none;
		outline: 0;
		-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
		box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
	}

	.btn-success {
		color: #fff;
		background-color: #5cb85c;
		border-color: #4cae4c;
	}

	.btn-success:focus {
		color: #fff;
		background-color: #449d44;
		border-color: #255625;
	}

	.btn-success:hover {
		color: #fff;
		background-color: #449d44;
		border-color: #398439;
	}

	.btn-success:active {
		color: #fff;
		background-color: #449d44;
		border-color: #398439;
	}

	.btn-success:active:focus,
	.btn-success:active:hover {
		color: #fff;
		background-color: #398439;
		border-color: #255625;
	}

	.btn-success:active {
		background-image: none;
	}

	.btn-danger {
		color: #fff;
		background-color: #d9534f;
		border-color: #d43f3a;
	}

	.btn-danger:focus {
		color: #fff;
		background-color: #c9302c;
		border-color: #761c19;
	}

	.btn-danger:hover {
		color: #fff;
		background-color: #c9302c;
		border-color: #ac2925;
	}

	.btn-danger:active {
		color: #fff;
		background-color: #c9302c;
		border-color: #ac2925;
	}

	.btn-danger:active:focus,
	.btn-danger:active:hover {
		color: #fff;
		background-color: #ac2925;
		border-color: #761c19;
	}

	.btn-danger:active {
		background-image: none;
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

	.pull-right {
		float: right!important;
	}

	.pull-left {
		float: left!important;
	}

	button::-moz-focus-inner,
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

	button {
		background: none;
		border: 0;
		margin: 0;
		padding: 0;
		cursor: pointer;
	}

	img {
		border: 0;
		vertical-align: top;
	}

	input,
	button,
	*:focus {
		outline: none!important;
	}

	img {
		vertical-align: middle;
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

	form {
		margin-bottom: 30px;
	}

	:active,
	:focus {
		outline: none!important;
	}

	input[type="number"]:focus {
		outline: 0 none;
		-webkit-box-shadow: none!important;
		-moz-box-shadow: none!important;
		-o-box-shadow: none!important;
		box-shadow: none!important;
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

	.size-20 {
		font-size: 20px!important;
		line-height: 26px!important;
	}

	.width-100 {
		width: 100px!important;
	}

	.padding-10 {
		padding: 10px!important;
	}

	.margin-top-20 {
		margin-top: 20px!important;
	}

	.noradius {
		-webkit-border-radius: 0!important;
		-moz-border-radius: 0!important;
		border-radius: 0!important;
	}

	.bold {
		font-weight: bold!important;
	}

	.text-left {
		text-align: left!important;
	}

	.btn>i {
		padding-right: 6px;
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

	button::-moz-focus-inner {
		padding: 0;
		border: 0;
	}

	.fa {
		display: inline-block;
		font: normal normal normal 14px/1 FontAwesome;
		font-size: inherit;
		text-rendering: auto;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.pull-right {
		float: right;
	}

	.pull-left {
		float: left;
	}

	.fa-times:before {
		content: "\f00d";
	}

	.btn.pull-right {
		margin: 5px 0 5px 5px;
	}

	.btn {
		height: 40px;
	}

	.panel {
		margin-bottom: 30px;
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

	.btn {
		position: relative;
	}

	.panel,
	.btn {
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

	.cartContent .qty input {
		padding: 3px;
		margin: 0;
		border: #ccc 1px solid;
		width: 50px;
		margin-right: 3px;
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

	.cartContent a.remove_item {
		background: rgba(0, 0, 0, 0.1);
		border: rgba(0, 0, 0, 0.1) 1px solid;
		padding-top: 0;
		margin-top: 10px;
		height: 30px;
		line-height: 26px;
		font-size: 18px;
		text-decoration: none;
		color: rgba(0, 0, 0, 0.5);
		border-radius: 3px;
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
