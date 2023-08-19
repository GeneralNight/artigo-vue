<script lang='ts' setup>
import { ref } from 'vue';

const emits = defineEmits<{
    (e:'updateVal',val:number):void
}>()

const props = defineProps<{
    max: number
    min: number
}>()

const actualNum = ref(0)

const increase = () => {
    if(actualNum.value>=props.max) return
    actualNum.value++
    emits('updateVal',actualNum.value)    
}

const decrease = () => {
    if(actualNum.value <= props.min) return
    actualNum.value--
    emits('updateVal',actualNum.value)    
}

</script>

<template>
<div class="flex flex-col bg-[#505050] w-[50px] sm:w-[100px] text-white rounded sm:gap-2">
    <button @click=increase() class="text-xl sm:text-4xl py-2">+</button>
    <input type="number" class="bg-transparent text-center text-lg sm:text-4xl" :size="1" :max="max" :min="min" v-model="actualNum">
    <button @click=decrease() class="text-xl sm:text-4xl py-2">-</button>
</div>
</template>

<style lang='scss' scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance:textfield;
}
</style>