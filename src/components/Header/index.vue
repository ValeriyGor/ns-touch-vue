<template>
  <header>
    <div class="container flex justify-start">
      <svg class="menu-mobile ham hamRotate ham4" viewBox="0 0 100 100" width="80">
        <path
            class="line top"
            d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
        <path
            class="line middle"
            d="m 70,50 h -40" />
        <path
            class="line bottom"
            d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
      </svg>
      <router-link to="/" class="logo">
        <img src="../../assets/img/logos.png" alt="" width="60">
      </router-link>
      <ul class="top-menu">
        <li class='top-menu__item active'><a href="https://ns-touch.com/">TOUCH SWITCHES</a></li>
        <li class='top-menu__item active'><router-link to="/">Create Touch</router-link></li>
        <li class='top-menu__item active'><a href="https://ns-touch.com/relay-station.html">Relay Station</a></li>
        <li class='top-menu__item active'><a href="https://ns-touch.com/ready-offers.html">Ready Offers</a></li>
        <li class='top-menu__item active'><a href="https://ns-touch.com/gallery.html">Gallery</a></li>
        <li class='top-menu__item active'><a href="https://ns-touch.com/downloads.html">Downloads</a></li>
        <li class='top-menu__item active'><a href="https://ns-touch.com/contacts.html">Contacts</a></li>
      </ul>
    </div>
  </header>
</template>

<script>
  export default {
    name: "Header"
  }
</script>