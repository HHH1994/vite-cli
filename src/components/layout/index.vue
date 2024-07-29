<template>
  <div class="h-layout_wrapper">
    <!-- content north-->
    <navbar  class="h-layout_nav"/>
    <!-- content south -->
    <section class="h-layout_content-south">
        <!-- sidebar -->
        <sidebar />
        <!-- main content -->
        <div class="h-layout_content-south-main">
            <router-view></router-view>
        </div>
    </section>
  </div>
</template>
<script setup>
import navbar from './navbar.vue';
import sidebar from './sidebar.vue';

</script>
<style lang="scss" scoped>
.h-layout{
    &_wrapper {
        @include flex-col-center;
        width: 100%;
        height: 100%;
        background: #e7ebf0;
    }

    &_nav {
        width: 100%;
    }

    &_content-south {
        flex: 1;
        display: flex;
        width: 100%;

        &-main {
            width: 100%;
            height: 100%;
            padding: 12px 12px 0 0;
            overflow-y: auto;
        }
    }
}

</style>