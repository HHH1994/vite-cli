<template>
  <div ref="wrap">
    <slot v-if="!isShowComp" name="skelton"></slot>
    <slot v-if="!isShowComp" name="loading">加载中</slot>
    <slot v-else></slot>
  </div>
</template>
<script setup>
import {onMounted, ref, watch} from 'vue';
let isShowComp = ref(false);
const wrap  = ref(null);
const props = defineProps({
    root: {
        type: Object,
        default(rawProp) {
            return rawProp ||  null
        }
    },
    threshold: {
        type: [Number, Array],
        default: 0.6
    }
})

const initObsever = () => {
    return new IntersectionObserver((entries, observer) => {
        console.log(entries[0])
        entries.forEach(el => {
            if (props.threshold instanceof Array) {
                setTimeout(() => {
                    isShowComp.value = true;
                    observer.disconnect();
                }, 5000);
            } else if (el.intersectionRatio >= props.threshold) {
                setTimeout(() => {
                    isShowComp.value = true;
                    observer.disconnect();
                }, 5000);
            }
        })
    }, {
            root: props.root,
            threshold: props.threshold
    });
}
let observer = initObsever();


// case 1
// watch(() => props.root, () => {
//     observer.disconnect();
//     observer = initObsever();
//     observer.observe(wrap.value)
// })


onMounted(() => {
    observer.observe(wrap.value)
})
</script>
<style lang="scss" scoped></style>
