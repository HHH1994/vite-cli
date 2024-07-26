<template>
  <div class="wrap">
     <el-tabs v-model="activeName" :closable="false" @tab-change="handleClick">
        <el-tab-pane label="宫缩" name="gs">
            <el-button @click="addGS">add</el-button>
            <el-scrollbar ref="scrollRef1" height="calc(100% - 50px)">
                <el-timeline>
                    <el-timeline-item
                    v-for="(record, index) in gsRecords"
                    :key="index"
                    :timestamp="record.timestamp"
                    >
                    {{ record.content }}
                    </el-timeline-item>
                </el-timeline>
            </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="单次咳嗽" name="ks">
            <el-button @click="addKS">add</el-button>
            <el-scrollbar ref="scrollRef2" height="calc(100% - 50px)">
                <el-timeline>
                    <el-timeline-item
                    v-for="(record, index) in ksRecords"
                    :key="index"
                    :timestamp="record.timestamp"
                    >
                    {{ record.content }}
                    </el-timeline-item>
                </el-timeline>
            </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="严重咳嗽" name="yzks">
            <el-button @click="addYZKS">add</el-button>
            <el-scrollbar ref="scrollRef3" height="calc(100% - 50px)">
                <el-timeline>
                    <el-timeline-item
                    v-for="(record, index) in yzksRecords"
                    :key="index"
                    :timestamp="record.timestamp"
                    >
                    {{ record.content }}
                    </el-timeline-item>
                </el-timeline>
            </el-scrollbar>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import {ref, reactive, onMounted, onBeforeMount, nextTick} from 'vue';

let activeName = ref('ks');
const  scrollRef1 = ref();
const  scrollRef2 = ref();
const  scrollRef3 = ref();

let ksRecords = reactive([]);
let yzksRecords = reactive([]);
let gsRecords = reactive([]);

function handleClick(val) {
    if (val) {
        activeName.value = val;
    }
}

function addYZKS() {
    const newItem = {
        content: '严重咳嗽+1',
        timestamp: new Date().toLocaleTimeString()
    };

    if (yzksRecords.length > 0) {
        const last = yzksRecords[yzksRecords.length -1].timestamp.split(':');
        const cur = newItem.timestamp.split(':');
        const interval = +(cur[0] - last[0]) * 60 + (+cur[1]) - (+last[1]);
        newItem.content += ` 距离上次间隔${interval}分`
    }
    yzksRecords.push(newItem)
    localStorage.setItem('yzks', JSON.stringify(yzksRecords));
    scrollToBottom(scrollRef3, yzksRecords.length)
}

function addKS() {
    const newItem = {
        content: '咳嗽+1',
        timestamp: new Date().toLocaleTimeString()
    };

    if (ksRecords.length > 0) {
        const last = ksRecords[ksRecords.length -1].timestamp.split(':');
        const cur = newItem.timestamp.split(':');
        const interval = +(cur[0] - last[0]) * 60 + (+cur[1]) - (+last[1]);
        newItem.content += ` 距离上次间隔${interval}分`
    }
    ksRecords.push(newItem)
    localStorage.setItem('ks', JSON.stringify(ksRecords));
    scrollToBottom(scrollRef2, ksRecords.length)
}

function addGS() {
    const newItem = {
        content: '宫缩+1',
        timestamp: new Date().toLocaleTimeString()
    };

    if (gsRecords.length > 0) {
        const last = gsRecords[gsRecords.length -1].timestamp.split(':');
        const cur = newItem.timestamp.split(':');
        const interval = +(cur[0] - last[0]) * 60 + (+cur[1]) - (+last[1]);
        newItem.content += ` 距离上次间隔${interval}分`
    }
    gsRecords.push(newItem)
    localStorage.setItem('gs', JSON.stringify(gsRecords));
    scrollToBottom(scrollRef1, gsRecords.length)
}

function scrollToBottom(scrollRef, size) {
    nextTick(() => {
        scrollRef.value.setScrollTop(62 * size);
    })
}

onMounted(() => {
    const localGS = localStorage.getItem('gs') ? JSON.parse(localStorage.getItem('gs')) : [];
    gsRecords.push(...localGS);

    const localYZKS = localStorage.getItem('yzks') ? JSON.parse(localStorage.getItem('yzks')) : [];
    yzksRecords.push(...localYZKS);

    const localKS = localStorage.getItem('ks') ? JSON.parse(localStorage.getItem('ks')) : [];
    ksRecords.push(...localKS)
})

</script>
<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100%;

    .el-button {
        margin-bottom: 20px;
    }

    .el-timeline {
        width: 280px;
    }    

    .el-tabs {
        height: 100%;
    }

    :deep(.el-tabs__content) {
        height: calc(100% - 55px);
        overflow: hidden;

        .el-tab-pane {
            height: 100%;
        }
    }
}
</style>