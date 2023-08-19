<script lang='ts' setup>

const props = defineProps<{
    num: number
}>()


</script>

<template>
<div class="flex flex-col bg-[#505050] w-[50px] sm:w-[100px] text-white rounded gap-2">
    
    <input type="number" class="bg-transparent text-center text-xl sm:text-6xl py-10 sm:py-12 font-bold" :size="1" :value="num">
    
</div>
</template>

<style lang='scss' scoped>
input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>