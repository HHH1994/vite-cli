<template>
  <div class="h-navbar">
      <div class="h-navbar_lf"></div>
      <div class="h-navbar_rg">
        <el-dropdown
            :hide-on-click="false"
            class="avatar-container right-menu-item hover-effect"
        >
            <div class="avatar-wrapper">
                <img
                    class="avatar-img"
                    src="@/assets/image/setting/portal/avatar.png"
                    alt
                />
                <i class="iconfont iconxiala" />
            </div>
            <template #dropdown>
                <el-dropdown-menu class="user-box">
                    <el-dropdown-item>
                        <div class="user-info">
                            <img
                                class="user-avatar"
                                src="@/assets/image/setting/portal/avatar.png"
                                alt
                            />
                            <div class="user-info-text">
                                <span class="user-name">{{userNameComputed}}</span>
                            </div>
                        </div>
                    </el-dropdown-item>
                    <!-- 菜单dropdown-item -->
                    <div class="system-box">
                        <div class="system-list">
                            <div class="system-item">
                                <i class="icon iconfont iconxitongshezhi"></i>
                                <span class="label">系统设置</span>
                            </div>
                            <div class="system-item" @click="changeUserName">
                                <i class="icon iconfont iconxitongshezhi"></i>
                                <span class="label">改变名称</span>
                            </div>
                            <div class="system-item" @click="logout">
                                <i class="icon iconfont icontuichudenglu1"></i>
                                <span class="label">退出登录</span>
                            </div>
                        </div>
                    </div>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
      </div>
  </div>
</template>
<script setup>
import {useUserStore} from '@/store/userInfo';
import { mapActions, storeToRefs } from 'pinia';
import { toRefs } from 'vue';

const userStore= useUserStore();

// userStore返回的是reactive，storeToRefs会将state中的属性变为ref，类似于toRefs
const {userName} = storeToRefs(userStore)
// const {userName} = toRefs(userStore);
console.log(storeToRefs(userStore), toRefs(userStore))

// const changeUserName = () => {
//   // case 1 directly change state
//   // userStore.userName = '123'

//   // case 2  change action
//   userStore.changeName()
// }

const {changeUserName} = mapActions(useUserStore, {changeUserName: 'changeName'})
const userNameComputed = computed(() => {
  return userName;
})

</script>
<style lang="scss" scoped>
.h-navbar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    background: #fff;

    &_lf {
        flex: 1;
    }
    &_rg {
       .avatar-img {
            width: 30px;
            height: 30px;
            object-fit: contain;
            margin-right: 10px;
            vertical-align: middle;
            cursor: pointer;
        }

        .iconxiala {
            font-size: 10px;
            color: #8c8c8c;
            vertical-align: middle;
            cursor: pointer;
        }
    }
}

.el-dropdown-menu {
  padding: 10px 20px 14px 20px;
  width: 360px;
  border-radius: 8px;
  background: #fff;
  :deep(.popper__arrow) {
    display: none;
  }
}

.user-info {
  display: flex;
  align-items: center;
  width: 200px;
  cursor: pointer;
  .user-avatar {
    width: 50px;
    height: 50px;
    object-fit: contain;
    margin-right: 12px;
  }
  .user-name {
    font-weight: 600;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    .iconyou{
      font-weight: normal;
      font-size: 14px;
      &:hover{
        color: #0080FF;
      }
    }
  }
  
}

.system-box{
  .system-list{
    display: flex;
    align-items: center;
  }
  .system-item{
    width: 100px;
    padding: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
      background: #F5F7FA;
      border-radius: 4px 4px 4px 4px;
    }
  }
  .icon{
    font-size: 18px;
  }
  .label{
    font-size: 13px;
    color: rgba(0,0,0,0.65);
    line-height: 22px;
  }
}
</style>