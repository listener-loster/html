<template>
  <div>
    <div id="topBar">
      <template v-if="user!=null">
        <el-menu :default-active="'2'" class="el-menu-demo" mode="horizontal">
          <el-submenu index="2" style="float: right">
            <template slot="title">
              <i class="fa fa-user hidden-xs"></i> 会员中心
            </template>
            <el-menu-item index="2-1">
              <li>
                <a tabindex="-1" @click="goto('/account/ewallet','EWallet')">
                  <i class="fa fa-money"></i>充值
                </a>
              </li>
            </el-menu-item>
            <el-menu-item index="2-2">
              <li>
                <a tabindex="-1" @click="logout">
                  <i class="fa fa-sign-out"></i>退出
                </a>
              </li>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3" style="float: right">
            <li class="text-welcome hidden-xs">
              <template v-if="user.id">欢迎</template>
              <strong v-if="user.nickname">{{user.nickname}}</strong>
              <strong v-else>{{user.userName}}</strong>
            </li>
          </el-menu-item>
        </el-menu>
      </template>
      <template v-else>
        <el-menu :default-active="'2'" router class="el-menu-demo" mode="horizontal">
          <el-menu-item style="float: right" index="/register">
            <router-link to class="sysBuilding">注册</router-link>
          </el-menu-item>
          <el-menu-item style="float: right" index="/login">
            <router-link to class="sysBuilding">登录</router-link>
          </el-menu-item>
        </el-menu>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      productName: "",
      user: null,
      cartCount: "",
      cartList: null,
      cartShowFlag: false
    };
  },
  computed: {
    getUser() {
      return this.$store.state.user;
    },
    cartCountFromStore() {
      return this.$store.state.cartCount;
    }
  },
  created() {
    var user = this.Storage.Local.get("User");
    this.displayUserInfo(user);
  },
  methods: {
    search() {
      var path = this.$route.path;
      if (path == "/search") {
        this.$store.commit("setKeyword", this.productName);
      } else {
        if (this.productName) {
          this.$router.push({
            path: "/search",
            name: "Search"
          });
          var params = {
            name: this.productName
          };
          this.Storage.Session.set("data", params);
        }
      }
    },
    logout() {
      this.user = null;
      this.Storage.Local.remove("User");
      this.cartCount = "";
      if (this.$route.path.indexOf("/account") != -1) {
        this.$router.push({
          path: "/login",
          name: "Login",
          params: {
            msg: "您还未登录，请登录！"
          }
        });
      }
    },
    displayUserInfo(user) {
      this.user = user;
    },
    hidePanel(e) {
      if (!this.$refs.box.contains(e.target)) {
        this.cartShowFlag = false;
        document.removeEventListener("click", this.hidePanel, false);
      }
    },
    goto(path, name, val) {
      this.$router.push({
        path: path,
        name: name
      });
      if (val) {
        this.Storage.Session.set("data", {
          id: val
        });
      }
      if (path == "/cart/cart") {
        this.cartShowFlag = false;
      }
    },
    viewCartProduct(productId) {
      if (this.$route.path == "/product") {
        this.$store.commit("setCartProductId", productId);
      } else {
        this.goto("/product", "Product", productId);
      }
    },hiddenshow(){
      
    }
  },
  watch: {
    getUser: function(newVal, oldVal) {
      this.displayUserInfo(newVal);
      this.getCartCount();
    },
    cartCountFromStore: function(newVal, oldVal) {
      if (this.cartCount != newVal) {
        this.getCartCount();
      }
    }
  }
};
</script>

<style scoped>
.showCart {
  display: block !important;
}
</style>
