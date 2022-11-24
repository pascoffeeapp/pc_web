<template>
    <div>
        <h1 @dblclick="gantiteks">Outlet</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, beatae?</p> 
        <a href="">{{teks}}</a>
        <br>
        <button @click="gantiteks">click</button>
        <button @click="gantilagi">click</button>
        <input type="number" v-model="teks">
    </div>
</template>

<script>

export default {
    data() {
        return {
            teks:'woo lom nyan',
            
        }
    },
    methods: {
        gantiteks(){
            this.teks = 'laen lom'
        },
        gantilagi(){
            // this.teks = 'nyanban keuh'
            this.teks = 'cie'
        }
    },
    
}

</script>