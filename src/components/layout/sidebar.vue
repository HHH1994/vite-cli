<template>
  <div
    class="h-sidevar_wrapper"
    :class="{ collapseSideBar: isCollapse }"
    :style="{ width: sideBarWidth }"
  >
    <el-menu
      :default-active="defaultMenu"
      class="h-menu"
      :collapse="isCollapse"
      :collapse-transition="false"
      @select="handlerSelect"
    >
      <el-menu-item
        v-for="menu of menuList"
        :key="menu.href"
        :index="menu.href"
        class="level-1-menu"
      >
        <i class="iconfont iconxinqisudi"></i>
        <template #title>
            <span class="menu-title">{{ menu.menuName }}</span>
        </template>
      </el-menu-item>
    </el-menu>
    <div class="h-menu-expand-btn" @click="toggleExpand">
      <i
        class="iconfont"
        :class="isCollapse ? 'iconshouqi3' : 'iconzhankai2'"
      ></i>
      <span v-if="isShowExpandText" class="btn-text">收起导航</span>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch } from "vue";
import router from "@/router/index";
import { useRouter } from "vue-router";

const emit = defineEmits(["collapse"]);
const isCollapse = ref(false);
const isShowExpandText = ref(true);
const sideBarWidth = ref("160px");
const defaultMenu = ref('');

const pages = import.meta.glob("@/page/*.*");
const menuList = reactive([]);
Object.keys(pages).forEach((key, idx) => {
  const fileName = key.split("/").pop();
  const routeName = fileName.split(".")[0];
  if(idx === 0) {
    defaultMenu.value = `/${routeName}`;
  }
  menuList.push({
    menuName: routeName,
    href: `/${routeName}`,
  });
});

const {currentRoute} = useRouter();
watch(() => currentRoute.value, () => {
  const {path} = currentRoute.value;
  if (path !== defaultMenu.value) {
    defaultMenu.value = path;
  }
}, {
  immediate: true
})

const handlerSelect = (key, keyPath) => {
  console.log(key, keyPath);
  router.push(key);
};

const toggleExpand = () => {
  sideBarWidth.value = !isCollapse.value ? "58px" : "160px";
  isCollapse.value = !isCollapse.value;
  isShowExpandText.value = !isShowExpandText.value;
};
</script>
<style lang="scss" scoped>
.h-sidevar_wrapper {
  display: flex;
  flex-direction: column;
  background: #f2f3f6;
  padding: 8px;
  width: 160px;
  overflow: hidden;
  transition: width 300ms ease;
}

.h-menu {
  flex: 1;

  .menu-title {
      display: inline-block;
      width: 100%;
      @include textOverflow;
  }

  :deep(.level-1-menu) {
    padding-left: 12px !important;

    & > .el-sub-menu__title {
      padding-left: 12px !important;
    }

    & > .el-menu-tooltip__trigger {
      padding-left: 12px !important;
    }
  }

  :deep(.el-sub-menu) {
    padding-left: 0 !important;
  }
}

.h-menu.el-menu--collapse {
  :deep(.level-1-menu) {
    padding-left: 0 !important;

    & > .el-menu-tooltip__trigger {
      padding-left: 12px !important;
    }

    & > .el-sub-menu__title {
      width: 42px;
      padding-left: 12px !important;
    }
  }
}

.h-menu-expand-btn {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 52px;
  padding: 18px 12px 10px;
  border-top: 1px solid #e4e7ed;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.85);
  user-select: none;

  .iconfont {
    color: rgba(0, 0, 0, 0.85);
    font-size: 18px;
    margin-right: 10px;
    line-height: 1;
    cursor: pointer;
  }

  .btn-text {
    white-space: nowrap;
    cursor: pointer;
  }
}

:deep(.el-menu) {
  border-right: 0;
  background: #f2f3f6;
  overflow-y: auto;
  overflow-x: hidden;

  .el-menu-item {
    height: auto;
    line-height: 1;
    // padding-left: 0!important;
    padding: 11px 0;
    margin-bottom: 5px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.85);
    border-radius: 4px;

    &:hover {
      background: #dde1ea;
    }

    &.is-active {
      background: #0080ff;
    }

    .iconfont {
      color: rgba(0, 0, 0, 0.85);
      font-size: 18px;
      margin-right: 10px;
      line-height: 1;
      vertical-align: middle;
      cursor: pointer;
    }

    .el-tooltip {
      height: auto !important;
      padding: 12px !important;
    }
  }

  .is-active {
    background: #0080ff;
    color: #fff;
    font-weight: 600;

    .iconfont {
      color: #fff;
      font-weight: normal;
    }
    span {
      color: #fff;
    }
  }
}

:deep(.el-sub-menu) {
  .el-sub-menu__title {
    // padding-left: 11px !important;
    height: auto;
    padding: 11px 12px;
    line-height: 1;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.85);

    &:hover {
      background: #dde1ea;
      border-radius: 4px;
    }
  }

  .iconfont {
    color: rgba(0, 0, 0, 0.85);
    font-size: 18px;
    margin-right: 10px;
    line-height: 1;
    vertical-align: middle;
    cursor: pointer;
  }

  &.is-active {
    .el-sub-menu__title {
      color: #fff;
    }
    i {
      color: #fff;
    }

    .iconfont {
      color: #fff;
      font-size: 18px;
      margin-right: 10px;
      line-height: 1;
      vertical-align: middle;
    }
    .el-menu-item {
      color: rgba(0, 0, 0, 0.65);
      span {
        color: rgba(0, 0, 0, 0.65);
      }
      &.is-active {
        color: #0080ff;
        background: rgba(0, 128, 255, 0.1);
        .iconfont {
          color: #0080ff;
        }
        span {
          color: #0080ff;
        }
      }
    }
  }
}

.collapseSideBar {
  width: 58px;
  :deep(.el-menu-item) {
    width: 42px;
    height: 40px;
  }
}
</style>