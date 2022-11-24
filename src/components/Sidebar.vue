<template>
    <section class="sidebar">
        <center>
            <img src="images/Logo_dasboard.png" class="profile_image" alt="Logo_dasboard">
            <div class="title_icon"><h4>KOPI<span> PAS</span></h4></div>
        </center>
        <div class="sidebar_menu"> 
            <router-link :to="{name:'Dashboard'}"><i class="fa-sharp fa-solid fa-house"></i><span>Dashboard</span></router-link>
            <router-link :to="{name:'Role'}"><i class="fas fa-user"></i><span>Role</span></router-link>
            <router-link :to="{name:'User'}"><i class="fas fa-users"></i><span>User</span></router-link>
            <router-link :to="{name:'Table'}"><i class="fa-solid fa-chair"></i><span>Table</span></router-link>
            <router-link :to="{name:'Menu'}"><i class="fa-solid fa-utensils"></i><span>Menu</span></router-link>
            <router-link :to="{name:'Outlet'}"><i class="fas fa-shop"></i><span>Outlet</span></router-link>
            <router-link :to="{name:'Stock'}"><i class='fas fa-box'></i><span>Stock</span></router-link>
            <router-link :to="{name:'Wallet'}"><i class="fas fa-wallet"></i><span>Wallet</span></router-link>
        </div>
    </section>

</template>