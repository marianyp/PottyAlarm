<template>
  <div class="relative">
    <div class="flex align-center result">
      <img :src="image" class="w-32 h-32 z-10">
      <span class="block self-center ml-8 text-xl">{{ name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: Number, default: 0, required: true },
    name: { type: String, default: '', required: true },
    image: { type: String, default: '', required: true }
  }
}
</script>

<style>
.result {
  background: rgba(120, 120, 120, 12%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
  margin: 1em 0;
  overflow: hidden;
}

.result::after {
  content: "";
  bottom: 0;
  background: #56ce9e;
  width: 0;
  height: 8px;
  position: absolute;
  transition: all 0.25s;
  opacity: 1;
}
.result:hover::after {
  width: 100%;
}
</style>
