<template>
    <div>test1</div>
    <div>{{model}}</div>
    <div>model2 title: {{model2}}</div>
</template>
<script setup>
import {defineModel, watch} from 'vue';

const model = defineModel({
    default: 1
})

const model2 = defineModel('title', {
    default: 1
})


watch(() => model.value, () => {
    console.log(model.value, 1);
}, {
    immediate: true
})
</script>