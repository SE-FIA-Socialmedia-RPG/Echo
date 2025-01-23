<--! <template>
    <div>
      <header class="shadow-sm bg-white">
        <h1>Home</h1>
        <nav>
            <NuxtLink to =""></NuxtLink>
                    
        <ul>
        <li> <NuxtLink to="/">Home</NuxtLink></li>
        <li> <NuxtLink to="/about">About </NuxtLink></li>
        <li> <NuxtLink to="/products">Products</NuxtLink></li>
        </ul>       
         
        </nav>
      </header>


      <!-- output the page content-->
      <div>
        <slot />
      </div>
    </div>
</template>


<style>
.router-link-exact-active {
    color: purple
}

h1{
    padding-bottom: 10px;;
    font-size:30px;
}

nav{
    padding-bottom:40px;
}
</style> -->