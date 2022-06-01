<template>
  <div>
    <div class="text-mako-50 grid h-screen w-full place-content-center items-center">
      <div class="mx-auto p-4 flex flex-wrap justify-center">
        <div class="text-center p-4">
          <img
            src="https://media0.giphy.com/media/3s1B6FF1EjvFe/giphy.gif?cid=ecf05e4765cl5d3iz3w40szp06ws6d5byeyw5iqe4xij4ng1&rid=giphy.gif&ct=g"
            alt="Not Found"
          />
        </div>
        <div class="text-center p-4 lg:ml-10">
          <div class="text-3xl font-black mb-3">DON'T BE SENTIMENTAL.</div>
          <div class="text-lg mb-10 lg:mb-28">It's just a 404 Error!</div>
          <router-link
            to="/"
            class="border-[2px] border-mako-600 text-mako-50 rounded-xl px-8 p-4 font-medium text-xs uppercase hover:bg-highlight hover:bg-opacity-10 hover:text-highlight hover:border-highlight"
            >Take me home</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
