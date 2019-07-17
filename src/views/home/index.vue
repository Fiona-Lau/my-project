<template>
  <el-container class="home">
    <el-header>
      <div>
        <img src="./heima.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="width">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-submenu :index="menu.id + ''" v-for="menu in menus" :key="menu.id">
            <template slot="title">
              <i :class="icons[menu.id+'']"></i>
              <span>{{menu.authName}}</span>
            </template>
            <el-menu-item
              :index="subMenu.id + ''"
              v-for="subMenu in menu.children"
              :key="subMenu.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subMenu.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data: () => ({
    menus: [],
    isCollapse: true,
    icons: {
      '125': 'iconfont icon-user',
      '103': 'iconfont icon-tijikongjian',
      '101': 'iconfont icon-shangpin',
      '102': 'iconfont icon-danju',
      '145': 'iconfont icon-baobiao'
    }
  }),
  created() {
    this.getMenus()
  },
  methods: {
    logout() {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenus() {
      const {
        data: { data, meta }
      } = await this.$http.get('menus')
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.menus = data
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {
    width() {
      return this.isCollapse ? '64px' : '200px';
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .iconfont {
    margin-right: 10px;
  }
  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}
</style>
