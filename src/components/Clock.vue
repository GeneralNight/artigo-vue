<script lang='ts' setup>
import { computed, ref } from 'vue';

const secsOnes = ref(0)
const secsTens = ref(0)
const minutesOnes = ref(0)
const minutesTens = ref(0)
const finalTime = ref(0)
const finalTimeout = ref(0)
const myInterval = ref()
const timeStarted = ref(false)
const timePaused = ref(false)

const startCountDown = () => {
    if(!timePaused.value) {
        finalTime.value = ((minutesTens.value * 10 * 60) + (minutesOnes.value * 60) + (secsTens.value * 10) + secsOnes.value) 
        finalTimeout.value = ((minutesTens.value * 10 * 60) + (minutesOnes.value * 60) + (secsTens.value * 10) + secsOnes.value) 
    }
    if(finalTime.value===0) {
        cancelCountDown()
        return
    }
    timeStarted.value = true
    timePaused.value = false
    myInterval.value = setInterval(() => {
        finalTimeout.value--
        console.log(finalTimeout.value)
        if(finalTimeout.value===0) {
            cancelCountDown()
        }
    }, 1000);
}

const pauseCountDown = () => {
    console.log('Paused CountDown')
    timePaused.value = true
    clearInterval(myInterval.value)
}

const cancelCountDown = () => {
    console.log('Canceled CountDown')
    finalTimeout.value = 0
    finalTime.value = 0
    secsOnes.value=0
    secsTens.value=0
    minutesOnes.value=0
    minutesTens.value=0
    clearInterval(myInterval.value)
    timeStarted.value = false
    timePaused.value = false
}

const displayTime = computed(()=>{
    const restOfSeconds = Math.floor(finalTimeout.value % 60) 
    const restOfMinutes = finalTimeout.value >= 60 ? Math.round(finalTimeout.value / 60) : 0
    return [restOfMinutes,restOfSeconds].map(val=>val<=9?`0${val}`:val.toString())
})

const displayPercentage = computed(()=>{
    return (finalTimeout.value / finalTime.value * 100).toFixed(2) 
})

</script>

<template>
<div class="flex flex-col w-full items-center ">
    <!-- HEADER BLOCK -->
    <div class="flex flex-col self-start border-b border-b-opacity-50 w-full p-4 sm:p-10 py-6 gap-2">
        <p class="font-bold text-xl sm:text-2xl">O tempo é seu aliado</p>
        <p class="text-sm sm:text-base opacity-75">Use o cronômetro abaixo para definir um tempo confortável e concluir suas tarefas.</p>
    </div>
    <!-- BODY BLOCK -->
    <div class="flex flex-col w-full py-10 px-4 sm:p-10 items-center gap-10 container">
        <div class="flex items-center w-full gap-3 sm:gap-6 justify-center" v-if="timeStarted">
            <div class="flex items-center gap-3">
                <DisplayNumber :num="displayTime[0][0]"/>
                <DisplayNumber :num="displayTime[0][1]"/>
            </div>
            <div class="flex flex-col gap-4">
                <div class="w-[8px] sm:w-[10px] aspect-square rounded-full bg-[#505050]"></div>
                <div class="w-[8px] sm:w-[10px] aspect-square rounded-full bg-[#505050]"></div>
            </div>
            <div class="flex items-center gap-3">
                <DisplayNumber :num="displayTime[1][0]"/>
                <DisplayNumber :num="displayTime[1][1]"/>
            </div>
        </div>

        <div class="flex items-center w-full gap-3 sm:gap-6 justify-center" v-if="!timeStarted">
            <div class="flex items-center gap-3">
                <InputNumber @updateVal="(val:number)=>minutesTens=val" :max="5" :min="0"/>
                <InputNumber @updateVal="(val:number)=>minutesOnes=val" :max="9" :min="0"/>
            </div>
            <div class="flex flex-col gap-4">
                <div class="w-[8px] sm:w-[10px] aspect-square rounded-full bg-[#505050]"></div>
                <div class="w-[8px] sm:w-[10px] aspect-square rounded-full bg-[#505050]"></div>
            </div>
            <div class="flex items-center gap-3">
                <InputNumber @updateVal="(val:number)=>secsTens=val" :max="5" :min="0"/>
                <InputNumber @updateVal="(val:number)=>secsOnes=val" :max="9" :min="0"/>
            </div>
        </div>

        <div class="shadow-special h-[20px] sm:h-[30px] w-[100%] rounded-full" v-if="timeStarted">
            <div class="h-[20px] sm:h-[30px] rounded-full bg-emerald-500" :style="`width:${displayPercentage}%`"></div>
        </div>
        <div class="flex items-center justify-center flex-wrap gap-y-5 gap-x-10 sm:gap-20">
            <button @click="pauseCountDown" class="px-5 py-2 rounded text-white bg-orange-500" v-if="timeStarted">Pausar</button>
            
            <button v-if="!timeStarted||timePaused" @click="startCountDown" class="px-5 py-2 rounded text-white bg-emerald-600">{{timePaused?'Retomar':'Iniciar'}}</button>
            
            <button @click="cancelCountDown" class="px-5 py-2 rounded text-white bg-red-700" v-if="timeStarted">Cancelar</button>
        </div>
    </div>
</div>
</template>

<style lang='scss' scoped>

</style>